import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: any;
  };
  errors?: any;
}

export function successResponse<T>(
  res: Response,
  data?: T,
  message: string = 'Success',
  meta?: ApiResponse['meta'],
  statusCode: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    meta,
  };
  return res.status(statusCode).json(response);
}

export function errorResponse(
  res: Response,
  message: string = 'An error occurred',
  statusCode: number = 400,
  errors?: any
) {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };
  return res.status(statusCode).json(response);
}

export function paginatedResponse<T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Success'
) {
  const totalPages = Math.ceil(total / limit);
  return successResponse(res, data, message, {
    page,
    limit,
    total,
    totalPages,
  });
}
