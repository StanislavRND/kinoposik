'use client';

import { FiltersResult, Sort } from '@/shared/components';
import { getSeriesFilters } from '@/shared/services/filter-series';
import { Media } from '@/shared/types/Media';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilmsPage = () => {
  const router = useRouter();
  const filterArr = [
    'По популярности',
    'По новизне',
    'Зарубежные Фильмы',
    'Российские Фильмы',
    'Фильмы 2024',
    'Фильмы 2023',
    'Фильмы 2022',
    'Фильмы 2021',
  ];

  const filterCodes: { [key: string]: string } = {
    'Зарубежные Фильмы': 'EN',
    'Российские Фильмы': 'RU',
    'Фильмы 2024': '2024',
    'Фильмы 2023': '2023',
    'Фильмы 2022': '2022',
    'Фильмы 2021': '2021',
  };

  const [films, setFilms] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      const queryString = selectedFilters.map((filter) => filterCodes[filter] || filter).join('/');
      const result = await getSeriesFilters(queryString, sortType);

      if (result.length > 0) {
        setFilms(result);
      } else {
        setFilms([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortType, setSortType] = useState<'rating' | 'createdAt'>('rating');

  const updateQueryParams = (filters: string[]) => {
    const queryString = filters.map((filter) => filterCodes[filter] || filter).join('/');
    router.push(`?query=${queryString}&sort=${sortType}`);
  };

  useEffect(() => {
    updateQueryParams(selectedFilters);
    fetchFilms();
  }, [selectedFilters, sortType]);

  return (
    <div className="all">
      <div className="all__container container">
        <div className="all__title">Фильмы смотреть онлайн</div>
        <div className="all__filter">
          <Sort
            filterArr={filterArr}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            setSortType={setSortType}
            sortType={sortType}
          />
        </div>
        <FiltersResult media={films} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default FilmsPage;
