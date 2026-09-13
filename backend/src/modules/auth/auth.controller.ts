import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { successResponse, errorResponse } from '../../utils/response';
import { AuthRequest } from '../../types';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, result, 'Registration successful. Please verify your account.', undefined, 201);
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;
      const result = await authService.login(identifier, password, req.ip, req.headers['user-agent']);
      return successResponse(res, result, 'Login successful');
    } catch (error: any) {
      return errorResponse(res, error.message, 401);
    }
  }

  async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, code, type } = req.body;
      const result = await authService.verifyOTP(identifier, code, type);
      return successResponse(res, result, 'Verification successful');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier } = req.body;
      const result = await authService.forgotPassword(identifier);
      return successResponse(res, { message: 'Reset code sent' }, 'Password reset code sent');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      const result = await authService.resetPassword(token, password);
      return successResponse(res, result, 'Password reset successful');
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) await authService.logout(token);
      return successResponse(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  async logoutAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await authService.logoutAll(req.user!.id);
      return successResponse(res, null, 'All sessions revoked');
    } catch (error) {
      next(error);
    }
  }

  async getSessions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sessions = await authService.getSessions(req.user!.id);
      return successResponse(res, sessions);
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { prisma } = await import('../../config/database');
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        include: { wallet: true, creditBalance: true, profile: true }
      });
      if (!user) return errorResponse(res, 'User not found', 404);
      const { passwordHash, ...safeUser } = user;
      return successResponse(res, safeUser);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
