import { Sort } from '@/shared/components';

const Series = () => {
  const filterArr = [
    'По популярности',
    'По новизне',
    'Зарубежные Сериалы',
    'Российские Сериалы',
    'Сериалы 2024',
    'Сериалы 2023',
    'Сериалы 2022',
    'Сериалы 2021',
  ];

  return (
    <>
      <div className="all">
        <div className="all__container container">
          <div className="all__title">Сериалы смотреть онлайн</div>
          <div className="all__filter"></div>
          <Sort filterArr={filterArr} />
        </div>
      </div>
    </>
  );
};

export default Series;
