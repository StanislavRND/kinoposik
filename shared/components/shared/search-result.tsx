'use client';

import { capitalizeFirstLetter } from '@/shared/lib';
import { searchMedia } from '@/shared/services/search';
import { Media } from '@/shared/types/Media';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export const SearchResult = ( ) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    async function fetchResults() {
      if (query) {
        try {
          setIsLoading(true);
          const res = await searchMedia(query);
          setResults(res);
        } catch (error) {
          console.error('Ошибка', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchResults();
  }, [query]);

  return (
    <>
      {isLoading ? (
        <div style={{ margin: '50px auto', textAlign: 'center' }}>Загрузка...</div>
      ) : results.length === 0 ? (
        <div className="profile__favorite-empty">Введите названия фильма</div>
      ) : (
        <div className="search__results">
          {results.map((el: Media) => (
            <Link href={`/watch/${encodeURIComponent(el.name)}`} key={el.id}>
              <div className="profile__favorite-film">
                <img src={el.imageUrl} width="100%" alt="" />
                <div className="profile__favorite-film-min-year">{el.minYearShow}+</div>
                <div className="search-film-rating">{el.rating?.toFixed(1)}</div>
                <div className="profile__favorite-film-name">{capitalizeFirstLetter(el.name)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
