import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/response';

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
      const parsed = schema.parse(data);
      if (source === 'body') req.body = parsed;
      if (source === 'query') req.query = parsed as any;
      if (source === 'params') req.params = parsed as any;
      next();
    } catch (error: any) {
      if (error.errors) {
        return errorResponse(res, 'Validation failed', 400, error.errors);
      }
      next(error);
    }
  };
}
