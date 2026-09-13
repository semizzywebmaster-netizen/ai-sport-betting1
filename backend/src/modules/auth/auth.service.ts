import { prisma } from '../../config/database';
import { hashPassword, comparePassword, generateOTP, generateRandomToken, formatPhoneNigeria } from '../../utils/helpers';
import { config } from '../../config/env';
import jwt from 'jsonwebtoken';
import { logger } from '../../utils/logger';

export class AuthService {
  async register(data: { username: string; email?: string; phone?: string; password: string; referralCode?: string; country?: string }) {
    // Check duplicates
    const existingUsername = await prisma.user.findUnique({ where: { username: data.username } });
    if (existingUsername) throw new Error('Username already taken');

    if (data.email) {
      const existingEmail = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingEmail) throw new Error('Email already registered');
    }

    if (data.phone) {
      const formattedPhone = formatPhoneNigeria(data.phone);
      const existingPhone = await prisma.user.findUnique({ where: { phone: formattedPhone } });
      if (existingPhone) throw new Error('Phone already registered');
      data.phone = formattedPhone;
    }

    let referredByUser = null;
    if (data.referralCode) {
      referredByUser = await prisma.user.findUnique({ where: { referralCode: data.referralCode } });
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        phone: data.phone,
        passwordHash,
        country: data.country || 'NG',
        referredBy: referredByUser?.id,
        wallet: { create: { cashBalance: 0, currency: 'NGN' } },
        creditBalance: { create: { credits: 5 } }, // welcome credits
        profile: { create: {} }
      },
      include: { wallet: true, creditBalance: true }
    });

    // Handle referral
    if (referredByUser) {
      await prisma.referral.create({
        data: {
          referrerId: referredByUser.id,
          refereeId: user.id,
          code: data.referralCode!,
          status: 'CONVERTED',
          convertedAt: new Date(),
        }
      });

      // Reward referrer
      await prisma.referralReward.create({
        data: {
          userId: referredByUser.id,
          referralId: user.id,
          credits: 10,
          type: 'credits',
          status: 'pending'
        }
      });
    }

    // Generate OTP for verification
    const otpCode = generateOTP();
    const otpType = data.email ? 'EMAIL_VERIFICATION' : 'PHONE_VERIFICATION';
    
    await prisma.oTP.create({
      data: {
        userId: user.id,
        identifier: data.email || data.phone!,
        code: otpCode,
        type: otpType as any,
        channel: data.email ? 'EMAIL' : 'SMS',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      }
    });

    // TODO: Send OTP via email/sms

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, otpCode }; // otpCode only for dev, remove in prod
  }

  async login(identifier: string, password: string, ip?: string, userAgent?: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
          { username: identifier },
        ]
      },
      include: { wallet: true }
    });

    if (!user) throw new Error('Invalid credentials');

    if (user.isSuspended) throw new Error('Account suspended');
    if (!user.isActive) throw new Error('Account deactivated');

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      // Log failed attempt
      logger.warn(`Failed login attempt for ${identifier} from ${ip}`);
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      config.jwt.secret as string,
      { expiresIn: config.jwt.expiresIn } as any
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret as string,
      { expiresIn: config.jwt.refreshExpiresIn } as any
    );

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token,
        refreshToken,
        ipAddress: ip,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token, refreshToken, session };
  }

  async verifyOTP(identifier: string, code: string, type: string) {
    const otp = await prisma.oTP.findFirst({
      where: {
        identifier,
        code,
        type: type as any,
        isUsed: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!otp) throw new Error('Invalid or expired OTP');

    await prisma.oTP.update({
      where: { id: otp.id },
      data: { isUsed: true }
    });

    if (type === 'EMAIL_VERIFICATION' || type === 'PHONE_VERIFICATION') {
      const user = await prisma.user.findFirst({
        where: { OR: [{ email: identifier }, { phone: identifier }] }
      });

      if (user) {
        if (type === 'EMAIL_VERIFICATION') {
          await prisma.user.update({ where: { id: user.id }, data: { isEmailVerified: true } });
        } else {
          await prisma.user.update({ where: { id: user.id }, data: { isPhoneVerified: true } });
        }
      }
    }

    return { success: true };
  }

  async forgotPassword(identifier: string) {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { phone: identifier }] }
    });

    if (!user) throw new Error('User not found');

    const token = generateRandomToken(32);

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      }
    });

    const otpCode = generateOTP();
    await prisma.oTP.create({
      data: {
        userId: user.id,
        identifier,
        code: otpCode,
        type: 'PASSWORD_RESET',
        channel: identifier.includes('@') ? 'EMAIL' : 'SMS',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      }
    });

    return { token, otpCode };
  }

  async resetPassword(token: string, newPassword: string) {
    const reset = await prisma.passwordReset.findUnique({ where: { token } });

    if (!reset || reset.isUsed || reset.expiresAt < new Date()) {
      throw new Error('Invalid or expired reset token');
    }

    const passwordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: reset.userId },
      data: { passwordHash }
    });

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { isUsed: true }
    });

    // Invalidate all sessions
    await prisma.session.updateMany({
      where: { userId: reset.userId },
      data: { isActive: false }
    });

    return { success: true };
  }

  async logout(token: string) {
    await prisma.session.updateMany({
      where: { token },
      data: { isActive: false }
    });
  }

  async logoutAll(userId: string) {
    await prisma.session.updateMany({
      where: { userId },
      data: { isActive: false }
    });
  }

  async getSessions(userId: string) {
    return prisma.session.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const authService = new AuthService();
