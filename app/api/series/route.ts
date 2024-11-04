import { prisma } from '@/prisma/prisma.client';
import { MediaType, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'rating';
  const filters = query.split('/');

  const filterMap: Record<string, { countryAbbreviation?: string; yearPublishing?: number }> = {
    RU: { countryAbbreviation: 'RU' },
    EN: { countryAbbreviation: 'EN' },
    '2024': { yearPublishing: 2024 },
    '2023': { yearPublishing: 2023 },
    '2022': { yearPublishing: 2022 },
    '2021': { yearPublishing: 2021 },
  };

  const appliedFilters = filters
    .map((filter) => filterMap[filter])
    .filter((filter): filter is { countryAbbreviation?: string; yearPublishing?: number } =>
      Boolean(filter),
    );

  const whereClause: Prisma.MediaWhereInput = {
    type: 'SERIA' as MediaType,
  };

  const countryConditions = appliedFilters
    .filter((filter) => filter.countryAbbreviation)
    .map((filter) => ({ countryAbbreviation: filter.countryAbbreviation }));

  const yearConditions = appliedFilters
    .filter((filter) => filter.yearPublishing)
    .map((filter) => filter.yearPublishing);

  if (countryConditions.length > 0) {
    whereClause.OR = countryConditions;
  }

  if (yearConditions.length > 0) {
    whereClause.yearPublishing = {
      in: yearConditions.filter((year): year is number => year !== undefined),
    };
  }

  try {
    const orderBy = sortBy === 'createdAt' ? { createdAt: 'desc' } : { rating: 'desc' };

    const films = await prisma.media.findMany({
      where: whereClause,
      orderBy: orderBy as Prisma.MediaOrderByWithRelationInput,
    });

    return NextResponse.json(films);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
