import { prisma } from '@/prisma/prisma.client';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as { id: number }).id;

    const userFavorites = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: {
          include: {
            media: true,
          },
        },
      },
    });

    if (!userFavorites) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json(userFavorites.favorites, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении избранного:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as { id: number }).id;

    const { mediaId } = await request.json();

    if (!mediaId) {
      return NextResponse.json({ error: 'Не указан mediaId' }, { status: 400 });
    }

    const favorite = await prisma.favorites.create({
      data: {
        userId,
        mediaId,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Ошибка при добавлении избранного:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ error: 'Необходима авторизация' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as { id: number }).id;

    const { mediaId } = await request.json();

    if (!mediaId) {
      return NextResponse.json({ error: 'Не указан mediaId' }, { status: 400 });
    }

    const deletedFavorite = await prisma.favorites.deleteMany({
      where: {
        userId,
        mediaId,
      },
    });

    if (deletedFavorite.count === 0) {
      return NextResponse.json({ error: 'Избранное не найдено' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Удалено успешно' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
