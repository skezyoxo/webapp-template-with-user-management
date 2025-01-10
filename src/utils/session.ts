import { PrismaClient, Session, User } from '@prisma/client';
import { AuthSession, SafeUser } from '../types/auth.types';
import { UnauthorizedError } from './errors';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const SESSION_EXPIRY_HOURS = 24;

/**
 * Create a new session for a user
 */
export async function createSession(user: User): Promise<Session> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRY_HOURS);

    return prisma.session.create({
        data: {
            id: uuidv4(),
            sessionToken: uuidv4(),
            userId: user.id,
            expires: expiresAt,
        },
    });
}

/**
 * Get session by token
 */
export async function getSessionByToken(token: string): Promise<AuthSession | null> {
    const session = await prisma.session.findUnique({
        where: { sessionToken: token },
        include: {
            user: {
                include: {
                    role: {
                        include: {
                            permissions: true,
                        },
                    },
                },
            },
        },
    });

    if (!session) return null;

    // Convert to AuthSession type
    const { user, ...sessionData } = session;
    const { passwordHash, ...safeUser } = user;

    return {
        ...sessionData,
        user: safeUser,
    };
}

/**
 * Validate session and return user
 */
export async function validateSession(token: string): Promise<SafeUser> {
    const session = await getSessionByToken(token);

    if (!session) {
        throw new UnauthorizedError('Invalid session');
    }

    if (session.expires < new Date()) {
        await deleteSession(token);
        throw new UnauthorizedError('Session expired');
    }

    return session.user;
}

/**
 * Delete session
 */
export async function deleteSession(token: string): Promise<void> {
    await prisma.session.delete({
        where: { sessionToken: token },
    });
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<number> {
    const result = await prisma.session.deleteMany({
        where: {
            expires: {
                lt: new Date(),
            },
        },
    });

    return result.count;
}

/**
 * Extend session expiry
 */
export async function extendSession(token: string): Promise<Session | null> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + SESSION_EXPIRY_HOURS);

    return prisma.session.update({
        where: { sessionToken: token },
        data: { expires: expiresAt },
    });
} 