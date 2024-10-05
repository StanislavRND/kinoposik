import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma.client';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: { phone },
      });
    }

    const token = generateToken(user.id); 

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24, 
      path: '/',
      sameSite: 'strict', 
    });

    const response = NextResponse.json({ 
      userId: user.id
    }, { status: 200 });

    response.headers.append('Set-Cookie', cookie); 

    return response;

  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}

function generateToken(userId: number): string {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }); 
}