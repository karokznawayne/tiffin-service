import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload || !['DELIVERY', 'ADMIN', 'MASTER_ADMIN'].includes(userPayload.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    // Fetch orders that are NOT cancelled. In a real app, filter by today's date.
    // For demo, we just show top 20 recent orders.
    const orders = await prisma.order.findMany({
      take: 20,
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
  
    if (!userPayload || !['DELIVERY', 'ADMIN', 'MASTER_ADMIN'].includes(userPayload.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  
    try {
      const { orderId, status } = await request.json();
  
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status, deliveryTime: status === 'DELIVERED' ? new Date() : null }
      });
  
      return NextResponse.json(updatedOrder);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
  }
