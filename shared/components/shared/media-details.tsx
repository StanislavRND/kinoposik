'use client';

import { convertMinuteToHours, descShowMore, formatSeasons } from '@/shared/lib';
import { checkAuth } from '@/shared/services/auth';
import { Genre } from '@/shared/types/Genre';
import { Media } from '@/shared/types/Media';
import React, { useEffect, useState } from 'react';
import { Actors } from './actors';
import { MediaDetailButtons } from './media-detail-buttons';
import { MediaDetailsInfo } from './media-details-info';
import { Seasons } from './seasons';

interface Props {
  mediaDetail: Media;
}

export const MediaDetail: React.FC<Props> = ({ mediaDetail }) => {
  const [isDescMore, setIsDescMore] = useState<boolean>(true);
  const [activeSeason, setActiveSeason] = useState(0);
  const [isGrade, setIsGrade] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setIsLoading(true);
        const result = await checkAuth();
        setIsAuthenticated(result);
      } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserAuth();
  }, []);

  return (
    <div className="full-film">
      <div className="full-film__block">
        <section className="full-film__detail">
          <img src={mediaDetail.imageUrlTitle} width={280} alt="" />
          <div className="full-film__rating">{mediaDetail.rating?.toFixed(1)}</div>
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
                ? formatSeasons(mediaDetail.seasons.length)
                : convertMinuteToHours(mediaDetail.duration || 0)}
            </div>
            <div className="full-film__detail-flex-info-minyear">{mediaDetail.minYearShow}+</div>
          </div>
          <MediaDetailButtons
            isAuthenticated={isAuthenticated}
            isGrade={isGrade}
            setIsGrade={setIsGrade}
            mediaId={mediaDetail.id}
            isLoading={isLoading}
          />
        </section>
        <div className="full-film__poster">
          <img src={mediaDetail.imageUrl} alt="" />
        </div>
      </div>
      <section className="full-film__info">
        <div className="full-film__detail-name">
          {mediaDetail.rangeYears
            ? `${mediaDetail.name} ${mediaDetail.seasons[activeSeason].number} ceзон`
            : `${mediaDetail.name}`}{' '}
        </div>
        <div className="full-film__detail-desc">
          {mediaDetail.rangeYears
            ? descShowMore(mediaDetail.seasons[activeSeason].description, isDescMore)
            : descShowMore(mediaDetail.description, isDescMore)}
          {isDescMore && <span onClick={() => setIsDescMore(false)}>...eще</span>}
        </div>
        {mediaDetail.rangeYears && (
          <Seasons
            activeSeason={activeSeason}
            setActiveSeason={setActiveSeason}
            mediaDetail={mediaDetail}
          />
        )}
        <Actors mediaDetail={mediaDetail} />
        <MediaDetailsInfo mediaDetail={mediaDetail} />
      </section>
    </div>
  );
};
