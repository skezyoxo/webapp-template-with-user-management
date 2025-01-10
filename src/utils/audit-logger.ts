import { PrismaClient } from '@prisma/client';
import winston from 'winston';

const prisma = new PrismaClient();

// Create a Winston logger specifically for audit logs
const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.File({ filename: 'logs/audit.log' })],
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
  try {
    // Log to database
    await prisma.$transaction([
      prisma.auditLog.create({
        data: {
          userId: entry.userId,
          action: entry.action,
          resource: entry.resource,
          details: entry.details,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
          timestamp: new Date(),
        },
      }),
    ]);

    // Also log to file system
    auditLogger.info('Audit event', entry);
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Still try to log to file if database fails
    auditLogger.error('Failed to log to database', { error, entry });
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
