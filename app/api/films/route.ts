import { prisma } from '@/prisma/prisma.client';
import { NextResponse } from 'next/server';

export async function GET() {
  const films = await prisma.media.findMany({
    where: {
      type: 'FILM',
    },
    include: {
      genres: true,
    },
  });

  return NextResponse.json(films);
}
