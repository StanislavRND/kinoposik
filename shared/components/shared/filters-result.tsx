'use client';

import { capitalizeFirstLetter } from '@/shared/lib';
import { Media } from '@/shared/types/Media';
import Link from 'next/link';

interface FiltersResultProps {
  media: Media[];
  isLoading: boolean;
}

export const FiltersResult = ({ media, isLoading }: FiltersResultProps) => {
  return (
    <div className="search__container">
      <>
        {isLoading ? (
          <div style={{ margin: '50px auto', textAlign: 'center' }}>Загрузка...</div>
        ) : media.length === 0 ? (
          <div className="profile__favorite-empty">Здесь пусто... 😞</div>
        ) : (
          <div className="search__results">
            {media.map((el: Media) => (
              <Link href={`/watch/${encodeURIComponent(el.name)}`} key={el.id}>
                <div className="profile__favorite-film">
                  <img src={el.imageUrl} width="100%" alt="" />
                  <div className="profile__favorite-film-min-year">{el.minYearShow}+</div>
                  <div className="search-film-rating">{el.rating?.toFixed(1)}</div>
                  <div className="profile__favorite-film-name">
                    {capitalizeFirstLetter(el.name)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    </div>
  );
};
