'use client';

import { useGetFilmsQuery } from '@/shared/store/films';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilmsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Читаем год из параметров URL, если есть
  const initialYear = searchParams.get('year') ? Number(searchParams.get('year')) : null;
  const [year, setYear] = useState<number | null>(initialYear);

  // Запрашиваем фильмы с фильтрацией по году
  const { data, error, isLoading } = useGetFilmsQuery({ year });

  // Обработчик нажатий на кнопки фильтрации по году
  const handleFilter = (selectedYear: number | null) => {
    setYear(selectedYear);

    if (selectedYear) {
      router.push(`/films?year=${selectedYear}`); // Добавляем год в URL
    } else {
      router.push('/films'); // Если год не выбран, отображаем все фильмы
    }
  };

  useEffect(() => {
    // Если год в URL изменился, обновляем состояние
    const urlYear = searchParams.get('year') ? Number(searchParams.get('year')) : null;
    setYear(urlYear);
  }, [searchParams]);

  return (
    <div className="all">
      <div className="all__container container">
        <div className="all__title">Фильмы смотреть онлайн</div>
        <div className="all__filter">
          <button onClick={() => handleFilter(null)}>Все фильмы</button>
          <button onClick={() => handleFilter(2024)}>Фильмы 2024</button>
          <button onClick={() => handleFilter(2023)}>Фильмы 2023</button>
          <button onClick={() => handleFilter(2022)}>Фильмы 2022</button>
        </div>
      </div>

      <ul>
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка: пенис</p>}
        {data?.map((film) => (
          <li key={film.id}>{film.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilmsPage;
