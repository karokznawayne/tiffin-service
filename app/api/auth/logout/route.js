import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json({ message: 'Logged out' });
  
  // Clear the cookie by setting it with Max-Age=0
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });

  return response;
}
