"use client"

import { Genre } from '@/types/Genre';
import { Media } from '@/types/Media';
import { formatSeasons } from '@/utils/FormatSeasons';
import { minuteAndHours } from '@/utils/MinuteAndHours';
import React, { useState } from 'react';

interface Props {
  mediaDetail: Media;
}

export const MediaDetail: React.FC<Props> = ({ mediaDetail }) => {
  const [isDescMore, setIsDescMore] = useState<boolean>(true);

  const descShowMore = (desc: string) => {
    if (desc.length > 208 && isDescMore) {
      return desc.slice(0, 208);
    } else if (!isDescMore) {
      return desc;
    }
  };

	console.log(mediaDetail)
  return (
    <div className="full-film">
      <div className="full-film__block">
        <section className="full-film__detail">
          <img src={mediaDetail.imageUrlTitle} width={280} alt="" />
          <div className="full-film__rating">{mediaDetail.rating}</div>
          <div className="full-film__detail-flex-info">
            <div className="full-film__detail-flex-info-year">
              <a href="#">
                {mediaDetail.rangeYears ? mediaDetail.rangeYears : mediaDetail.yearPublishing}
              </a>
            </div>
            <div className="full-film__detail-flex-info-genre">
              <a href="#">{mediaDetail.genres.map((el: Genre) => el.name).join(', ')}</a>
            </div>
            <div className="full-film__detail-flex-info-county">
              <a href="#">{mediaDetail.country}</a>
            </div>
            <div className="full-film__detail-flex-info-duration">
              {mediaDetail.rangeYears
                ? mediaDetail.seasons.length
                : minuteAndHours(mediaDetail.duration || 0)}
            </div>
            <div className="full-film__detail-flex-info-minyear">{mediaDetail.minYearShow}+</div>
          </div>
          <div className="full-film__detail-flex-buttons">
            <button className="full-film__detail-flex-buttons-show">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.3.332-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.-1.205-1.111-1.966-1.111z" />
              </svg>
              Смотреть бесплатно
            </button>
            <button className="full-film__detail-flex-buttons-favorites">
              <svg
                height="30px"
                width="30px"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 455 455">
                <path
                  d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92
	C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769
	l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714
	C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029
	c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368
	c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771
	c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"
                />
              </svg>
            </button>
          </div>
        </section>
        <div className="full-film__poster">
          <img src={mediaDetail.imageUrl} alt="" />
        </div>
      </div>
      <section className="full-film__info">
        <div className="full-film__detail-name">{mediaDetail.name} </div>
        <div className="full-film__detail-desc">
          {descShowMore(mediaDetail.description)}
          {isDescMore && <span onClick={() => setIsDescMore(false)}>...eще</span>}
        </div>
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
                : minuteAndHours(mediaDetail.duration || 0)}
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
      </section>
    </div>
  );
};
