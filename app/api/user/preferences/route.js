import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const prefs = await prisma.preferences.findUnique({
      where: { userId: userPayload.userId }
    });
    return NextResponse.json(prefs || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request) {
  const token = request.cookies.get('token')?.value;
  const userPayload = verifyJwt(token);

  if (!userPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { dietType } = await request.json(); // VEG, NON_VEG, BOTH

    const prefs = await prisma.preferences.upsert({
      where: { userId: userPayload.userId },
      update: { dietType },
      create: { 
        userId: userPayload.userId,
        dietType
      }
    });

    return NextResponse.json(prefs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
