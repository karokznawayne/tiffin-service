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
    const { startDate, endDate } = await request.json();

    const pauseRequest = await prisma.pauseRequest.create({
      data: {
        userId: userPayload.userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'APPROVED' // Auto-approval enabled
      }
    });

    // TODO: Logic to actually extend subscription end date would go here.
    // For now, we just record the pause request.

    return NextResponse.json({ message: 'Vacation mode activated', data: pauseRequest });
  } catch (error) {
    console.error('Pause Request Error:', error);
    return NextResponse.json({ error: 'Failed to request pause' }, { status: 500 });
  }
}

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const requests = await prisma.pauseRequest.findMany({
      where: { userId: userPayload.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pause requests' }, { status: 500 });
  }
}
