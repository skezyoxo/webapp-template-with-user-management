import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, isValidEmail, isStrongPassword } from '@/utils/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Get default role (assuming you have a 'user' role in your database)
    const defaultRole = await prisma.role.findFirst({
      where: { isDefault: true },
    });

    if (!defaultRole) {
      return NextResponse.json(
        { error: 'System configuration error: Default role not found' },
        { status: 500 }
      );
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
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
