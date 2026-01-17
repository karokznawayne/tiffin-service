import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signJwt } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code (First 4 chars of name + 4 random numbers) 
    const baseName = (name || 'USER').replace(/\s/g, '').toUpperCase().substring(0, 4);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `${baseName}${randomSuffix}`;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        referralCode,
        referredBy: body.referredBy || null,
        walletBalance: body.referredBy ? 50.0 : 0.0,
        preferences: {
          create: {} // Default preferences
        }
      },
    });

    const token = signJwt({ userId: user.id, email: user.email, role: user.role });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json({ user: userWithoutPassword }, { status: 201 });
    
    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
