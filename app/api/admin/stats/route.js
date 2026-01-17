import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload || !['ADMIN', 'MASTER_ADMIN', 'TEAM_LEAD'].includes(userPayload.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const totalUsers = await prisma.user.count();
    const pendingApprovals = await prisma.user.count({ where: { isApproved: false } });
    const activeOrders = await prisma.order.count({ where: { status: { in: ['PREPARING', 'OUT_FOR_DELIVERY'] } } });

    return NextResponse.json({
        totalUsers,
        pendingApprovals,
        activeOrders
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
