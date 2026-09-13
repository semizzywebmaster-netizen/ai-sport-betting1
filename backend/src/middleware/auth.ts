import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { prisma } from '../config/database';
import { errorResponse } from '../utils/response';
import { AuthRequest } from '../types';

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Authentication required', 401);
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true }
      });

      if (!session || !session.isActive || session.expiresAt < new Date()) {
        return errorResponse(res, 'Session expired or invalid', 401);
      }

      if (!session.user.isActive || session.user.isSuspended) {
        return errorResponse(res, 'Account suspended or inactive', 403);
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        phone: session.user.phone,
        username: session.user.username,
        role: session.user.role,
      };

      next();
    } catch (jwtError) {
      return errorResponse(res, 'Invalid or expired token', 401);
    }
  } catch (error) {
    return errorResponse(res, 'Authentication failed', 401);
  }
}

export function authorize(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 403);
    }
    next();
  };
}

export const isAdmin = authorize('ADMIN');
export const isAnalyst = authorize('ANALYST', 'ADMIN');
