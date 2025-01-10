import { NextResponse } from 'next/server';
import {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from './errors';

export type ApiHandler = (
  req: Request,
  context: { params: Record<string, string | string[]> }
) => Promise<Response> | Response;

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
      }

      if (error instanceof UnauthorizedError) {
        return NextResponse.json({ error: error.message, code: error.code }, { status: 401 });
      }

      if (error instanceof ForbiddenError) {
        return NextResponse.json({ error: error.message, code: error.code }, { status: 403 });
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json({ error: error.message, code: error.code }, { status: 404 });
      }

      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
      }

      // Handle unexpected errors
      return NextResponse.json(
        {
          error: 'Internal server error',
          code: 'INTERNAL_SERVER_ERROR',
        },
        { status: 500 }
      );
    }
  };
}
