'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useGetFilmsQuery } from '@/shared/store/films';
import { useEffect } from 'react';

const FilmsByYearPage = ({ params }: { params: { year: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const year = Number(params.year);
  
  // Получаем все параметры года из URL
  const yearParams = searchParams.getAll('year').map(Number).filter(Boolean);

  // Запрашиваем фильмы за конкретный год с учётом параметров
  const { data, error, isLoading } = useGetFilmsQuery({ year });

  // Обработчик нажатий на кнопки фильтрации по дополнительным годам
  const handleFilter = (selectedYear: number) => {
    // Добавляем или удаляем год из параметров
    const currentYears = new Set(yearParams);
    
    if (currentYears.has(selectedYear)) {
      currentYears.delete(selectedYear); // Удаляем год, если он уже есть
    } else {
      currentYears.add(selectedYear); // Добавляем год, если его нет
    }

    // Создаём новый URL с актуальными параметрами
    const newSearchParams = Array.from(currentYears)
      .map(year => `year=${year}`)
      .join('&');
    
    // Обновляем URL с новыми параметрами года
    router.push(`/films/${year}?${newSearchParams}`);
  };

  return (
    <div className="all">
      <div className="all__container container">
        <div className="all__title">Фильмы за {year} год</div>
        <div className="all__filter">
          <button onClick={() => handleFilter(2024)} className={yearParams.includes(2024) ? 'active' : ''}>2024</button>
          <button onClick={() => handleFilter(2023)} className={yearParams.includes(2023) ? 'active' : ''}>2023</button>
          <button onClick={() => handleFilter(2022)} className={yearParams.includes(2022) ? 'active' : ''}>2022</button>
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

export default FilmsByYearPage;
