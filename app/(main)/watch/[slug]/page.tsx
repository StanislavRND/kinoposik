import { prisma } from '@/prisma/prisma.client';
import { MediaDetail } from '@/shared/components';
import { Suspense } from 'react';

type WatchPageProps = {
  params: {
    slug: string;
  };
};

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = params;

  const decodedSlug = decodeURIComponent(slug).trim()

  const mediaItem = await prisma.media.findUnique({
    where: {
      name: decodedSlug,
    },
    include: {
      genres: true,
      seasons: {
        include: {
          episodes: true,
        },
      },
      actors: true,
      ratings: true,
    },
  });

  if (!mediaItem) {
    return <div>Медиа не найдено</div>;
  }

  return (
    <Suspense>
      <MediaDetail mediaDetail={mediaItem} />
    </Suspense>
  );
}
