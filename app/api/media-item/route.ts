import { prisma } from "@/prisma/prisma.client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
		const { searchParams } = new URL(request.url);
    const name = searchParams.get('name'); 

		if (!name) {
			return NextResponse.json({ error: 'Имя не предоставлено' }, { status: 400 });
	}

    const mediaItem = await prisma.media.findUnique({
      where: { name },
    });
    return NextResponse.json(mediaItem, { status: 200 });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}