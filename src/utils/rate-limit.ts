import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

export type RateLimitMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => void;

export const createRateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
): RateLimitMiddleware => {
  const limiter = rateLimit({
    windowMs,
    max,
    message: { error: 'Too many requests, please try again later.' },
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  });

  return (req, res, next) => {
    // Exclude certain routes or methods if needed
    if (req.method === 'OPTIONS') {
      return next();
    }

    return new Promise((resolve, reject) => {
      limiter(req, res, (error: Error | null) => {
        if (error) reject(error);
        resolve(next());
      });
    });
  };
};

// Helper to apply rate limiting to an API route
export const withRateLimit = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  options?: { windowMs?: number; max?: number }
) => {
  const rateLimiter = createRateLimiter(options?.windowMs, options?.max);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await new Promise((resolve, reject) => {
        rateLimiter(req, res, (error?: Error) => {
          if (error) reject(error);
          resolve(true);
        });
      });
      await handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        res.status(429).json({ error: error.message });
      } else {
        res.status(429).json({ error: 'Too many requests' });
      }
    }
  };
};
