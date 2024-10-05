import { prisma } from '@/prisma/prisma.client';
import { NextResponse } from 'next/server';

export async function GET() {
  const currentDate = new Date();
  const lastMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

  try {
    const premieres = await prisma.media.findMany({
      where: {
        createdAt: {
          gte: lastMonthDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        genres: true,
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    });

    return NextResponse.json(premieres);
  } catch (error) {
    console.error('Ошибка при получении премьер:', error);
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
