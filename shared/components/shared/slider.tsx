'use client';
import { useGetPremieresQuery } from '@/shared/store/premieres';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SkeletonCarousel } from '../ui';

export const Slider = () => {
  const { data: premieres, isLoading } = useGetPremieresQuery();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
  };

	if (!premieres || premieres.length === 0) {
    return <div>Нет премьеров для отображения.</div>;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonCarousel />
      ) : (
        <Carousel
          className="slider"
          draggable={false}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          focusOnSelect={false}
          responsive={responsive}>
          {premieres?.map((el) => (
            <Link
              className="slider__img"
              key={el.id}
              href={`/watch/${encodeURIComponent(el.name)}`}>
              <img src={el.imageUrl} alt="No img" />
              <div className="slider__rating">{el.rating?.toFixed(1)}</div>
              <div className="slider__min-age">{el.minYearShow}+</div>
            </Link>
          ))}
        </Carousel>
      )}
    </>
  );
};
