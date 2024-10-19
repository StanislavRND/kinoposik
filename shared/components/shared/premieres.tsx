'use client';

import { convertMinuteToHours, formatSeasons } from '@/shared/lib';
import { useGetPremieresQuery } from '@/shared/store/premieres';
import { Genre } from '@/shared/types/Genre';
import Link from 'next/link';
import React, { useRef } from 'react';
import ContentLoader from 'react-content-loader';

export const Premier: React.FC = () => {
  const { data: premieres, isLoading } = useGetPremieresQuery();

  const filmRefs = useRef(new Array(premieres?.length).fill(null));

  return (
    <div className="container">
      <div className="premier__title">Премьеры месяца</div>
      <div className="films">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <ContentLoader
              key={index}
              speed={2}
              backgroundColor="#292929"
              foregroundColor="#333333"
              width="100%"
              height="190px">
              <rect x="0" y="0" rx="3" ry="3" height="500px" width="100%" />
            </ContentLoader>
          ))
        ) : (
          <>
            {premieres?.map((item, index) => (
              <Link href={`/watch/${encodeURIComponent(item.name)}`} key={index} prefetch>
                <div key={index} className="film">
                  <img className="film__img" src={item.imageUrl} alt="img" />
                  <div className="film__main-rating">{item.rating?.toFixed(1)}</div>
                  <div className="film__min-age">{item.minYearShow}+</div>

                  <div ref={filmRefs.current[index]} className="film__info">
                    <div className="film__info-rating">{item.rating?.toFixed(1)}</div>
                    <div className="film__info-dop">
                      {item.rangeYears ? `${item.rangeYears}, ` : `${item.yearPublishing}, `}
                      {item.country},{' '}
                      <span style={{ color: '#fddd2d' }}>
                        {item.genres.map((el: Genre) => el.name).join(', ')}
                      </span>
                    </div>
                    <div className="film__info-duration">
                      {item.rangeYears
                        ? formatSeasons(item.seasons.length)
                        : convertMinuteToHours(item.duration ?? 0)}
                    </div>
                  </div>
                  <div className="film__name">{item.name}</div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
