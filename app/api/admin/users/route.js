import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload || !['MASTER_ADMIN', 'ADMIN'].includes(userPayload.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isApproved: true,
        createdAt: true
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  // Only Master Admin can modify roles
  if (!userPayload || userPayload.role !== 'MASTER_ADMIN') {
    return NextResponse.json({ error: 'Only Master Admin can perform this action' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, role, isApproved } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
        isApproved: isApproved
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
