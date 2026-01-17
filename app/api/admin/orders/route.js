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
    const orders = await prisma.order.findMany({
      orderBy: { date: 'desc' },
      include: {
        user: {
          select: { name: true, address: true, phone: true }
        }
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  // Allow admins and delivery to update status (though this is admin route, re-using logic is fine, but lets restrict strict role for admin page actions)
  if (!userPayload || !['ADMIN', 'MASTER_ADMIN', 'TEAM_LEAD'].includes(userPayload.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { orderId, status } = await request.json();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
