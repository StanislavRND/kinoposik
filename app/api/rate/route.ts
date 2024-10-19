import { prisma } from '@/prisma/prisma.client';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const { userId, mediaId, score } = await request.json();

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
    });

    let newRating;
    if (existingRating) {
      newRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { score },
      });
    } else {
      newRating = await prisma.rating.create({
        data: {
          userId,
          mediaId,
          score,
        },
      });
    }

    const ratings = await prisma.rating.findMany({
      where: { mediaId },
    });

    const averageRating = ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length;

    await prisma.media.update({
      where: { id: mediaId },
      data: { rating: averageRating },
    });

    return NextResponse.json({ newRating, averageRating }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обработке оценки:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
