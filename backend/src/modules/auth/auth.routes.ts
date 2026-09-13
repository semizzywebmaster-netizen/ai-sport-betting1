import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validation';
import { registerSchema, loginSchema, otpVerifySchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validator';
import { authenticate } from '../../middleware/auth';
import { authLimiter, otpLimiter } from '../../middleware/rateLimiter';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/verify-otp', otpLimiter, validate(otpVerifySchema), authController.verifyOTP);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

router.use(authenticate);
router.post('/logout', authController.logout);
router.post('/logout-all', authController.logoutAll);
router.get('/sessions', authController.getSessions);
router.get('/me', authController.me);

export default router;
