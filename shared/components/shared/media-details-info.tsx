'use client';

import { convertMinuteToHours, formatSeasons } from '@/shared/lib';
import { Genre } from '@/shared/types/Genre';
import { Media } from '@/shared/types/Media';
import React from 'react';

interface Props {
  mediaDetail: Media;
}

export const MediaDetailsInfo: React.FC<Props> = ({ mediaDetail }) => {
  return (
    <>
      <div className="full-film__info-name">Информация о фильме</div>
      <div className="full-film__info-desc">
        <span>Сюжет</span>
        <div style={{ maxWidth: '50%' }}>{mediaDetail.description}</div>
      </div>
      <div className="full-film__info-block">
        <div className="full-film__info-year">
          <span>Год выпуска</span>
          <div>{mediaDetail.rangeYears ? mediaDetail.rangeYears : mediaDetail.yearPublishing}</div>
        </div>
        <div className="full-film__info-genre">
          <span>Жанр</span>
          <div>{mediaDetail.genres.map((el: Genre) => el.name).join(', ')}</div>
        </div>
        <div className="full-film__info-duration">
          <span>Длительность</span>
          <div>
            {mediaDetail.rangeYears
              ? formatSeasons(mediaDetail.seasons.length)
              : convertMinuteToHours(mediaDetail.duration || 0)}
          </div>
        </div>
        <div className="full-film__info-county">
          <span>Страна</span>
          <div>{mediaDetail.country}</div>
        </div>
        <div className="full-film__info-rating">
          <span>Рейтинг</span>
          <div>{mediaDetail.minYearShow}+</div>
        </div>
      </div>
    </>
  );
};
