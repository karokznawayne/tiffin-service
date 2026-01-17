import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userPayload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        walletBalance: true,
        preferences: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
