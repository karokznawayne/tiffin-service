import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { planType } = body; // MONTHLY, WEEKLY

    const subscription = await prisma.subscription.create({
      data: {
        userId: userPayload.userId,
        planType: planType || 'MONTHLY',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: 'ACTIVE'
      }
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}

export async function GET(request) {
  // Get current user sub
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Return mock for now if DB empty or just to prevent 500 without migrations
  return NextResponse.json({ status: 'ACTIVE', plan: 'MONTHLY', daysLeft: 22 });
}
