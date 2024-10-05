import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma.client';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    await prisma.user.update({
      where: { id: userId },
      data: { token: null }, 
    });

    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, 
      path: '/',
      sameSite: 'strict',
    });

    const response = NextResponse.json({ message: 'Вы вышли из аккаунта' }, { status: 200 });
    response.headers.append('Set-Cookie', cookie); 

    return response;

  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  } 
}