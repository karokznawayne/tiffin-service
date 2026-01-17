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
    const { rating, comment } = await request.json();

    const feedback = await prisma.feedback.create({
      data: {
        userId: userPayload.userId,
        rating: Number(rating),
        comment: comment || ''
      }
    });

    return NextResponse.json({ message: 'Feedback submitted', data: feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}
