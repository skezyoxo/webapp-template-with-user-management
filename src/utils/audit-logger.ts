import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create a Winston logger specifically for audit logs
const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'audit.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
    }),
    // Also log to console in development
    ...(process.env.NODE_ENV !== 'production' ? [new winston.transports.Console()] : []),
  ],
});

export interface AuditLogEntry {
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAuditEvent(entry: AuditLogEntry) {
  let dbError: Error | null = null;

  try {
    // Log to database
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        resource: entry.resource,
        details: entry.details,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    dbError = error as Error;
    console.error('Failed to log audit event to database:', error);
  }

  try {
    // Always try to log to file system
    auditLogger.info('Audit event', {
      ...entry,
      timestamp: new Date().toISOString(),
      dbError: dbError?.message,
    });
  } catch (error) {
    console.error('Failed to write audit log to file:', error);
    // At this point, both DB and file logging failed
    if (dbError) {
      throw new Error('Audit logging failed for both database and file system');
    }
  }

  // If database logging failed but file logging succeeded, we still consider it a partial success
  if (dbError) {
    console.warn('Audit event only logged to file system');
  }
}

// Predefined audit actions for consistency
export const AuditActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  EXPORT: 'EXPORT',
  ADMIN_ACTION: 'ADMIN_ACTION',
  PERMISSION_CHANGE: 'PERMISSION_CHANGE',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  FAILED_LOGIN: 'FAILED_LOGIN',
} as const;

// Helper to get client IP and user agent
export function getClientInfo(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  return { ipAddress: ip, userAgent };
}
