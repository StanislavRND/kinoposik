import { generateCode } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { phoneNumber } = await request.json();

  if (!phoneNumber) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  const code = await generateCode(phoneNumber);

  return NextResponse.json({ message: 'Verification code sent', code });
}