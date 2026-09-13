import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  password: z.string().min(8).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and number'),
  referralCode: z.string().optional(),
  country: z.string().optional(),
}).refine(data => data.email || data.phone, {
  message: 'Either email or phone is required',
  path: ['email'],
});

export const loginSchema = z.object({
  identifier: z.string().min(3), // email, phone or username
  password: z.string().min(1),
  deviceId: z.string().optional(),
  deviceInfo: z.any().optional(),
});

export const otpVerifySchema = z.object({
  identifier: z.string(),
  code: z.string().length(6),
  type: z.enum(['EMAIL_VERIFICATION', 'PHONE_VERIFICATION', 'PASSWORD_RESET', 'LOGIN', 'WHATSAPP_LINK', 'WHATSAPP_VERIFICATION']),
});

export const forgotPasswordSchema = z.object({
  identifier: z.string(), // email or phone
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export const resendOTPSchema = z.object({
  identifier: z.string(),
  type: z.enum(['EMAIL_VERIFICATION', 'PHONE_VERIFICATION', 'PASSWORD_RESET', 'LOGIN']),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP']).optional(),
});
