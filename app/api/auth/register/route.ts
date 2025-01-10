import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, isValidEmail, isStrongPassword } from '@/utils/auth';
import { ValidationError } from '@/utils/errors';
import { withErrorHandler } from '@/utils/api-middleware';

const prisma = new PrismaClient();

async function handler(req: Request) {
  const { email, password, name } = await req.json();

  // Validate input
  if (!email || !password || !name) {
    throw new ValidationError('Please provide all required fields');
  }

  if (!isValidEmail(email)) {
    throw new ValidationError('Please provide a valid email address');
  }

  if (!isStrongPassword(password)) {
    throw new ValidationError('Password must be at least 8 characters long');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ValidationError('User with this email already exists');
  }

  // Get default role
  const defaultRole = await prisma.role.findFirst({
    where: { isDefault: true },
  });

  if (!defaultRole) {
    throw new ValidationError('System configuration error: Default role not found');
  }

  // Create the user
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      displayName: name,
      roleId: defaultRole.id,
    },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.displayName,
    },
  });
}

export const POST = withErrorHandler(handler);
