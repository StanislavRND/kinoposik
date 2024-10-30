import { prisma } from '@/prisma/prisma.client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year'); // Получаем год из query параметров

  try {
    const films = await prisma.media.findMany({
      where: {
        type: 'FILM',
        ...(year && { yearPublishing: Number(year) }), // Условие фильтрации по году
      },
      include: {
        genres: true,
      },
    });

    return NextResponse.json(films);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}