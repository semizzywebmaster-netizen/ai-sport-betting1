import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, config.bcryptRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export function generateRandomToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateReferralCode(username: string): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${username.substring(0, 4).toUpperCase()}${random}`;
}

export function generateBetCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'PP-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatPhoneNigeria(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '234' + cleaned.substring(1);
  }
  if (!cleaned.startsWith('234')) {
    if (cleaned.length === 10) {
      cleaned = '234' + cleaned;
    }
  }
  return '+' + cleaned;
}

export function isValidNigerianPhone(phone: string): boolean {
  const regex = /^(\+?234|0)[789][01]\d{8}$/;
  return regex.test(phone.replace(/\s/g, ''));
}

export function calculateOdds(selections: number[]): number {
  return selections.reduce((acc, odd) => acc * odd, 1);
}

export function calculatePotentialWin(stake: number, odds: number): number {
  return stake * odds;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function getPaginationParams(query: any) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function sanitizeUser(user: any) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
