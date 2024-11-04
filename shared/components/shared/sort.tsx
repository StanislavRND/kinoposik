'use client';

import { useState } from 'react';

type SortProps = {
  filterArr: string[];
  setSelectedFilters: (filters: string[]) => void;
  selectedFilters: string[];
  setSortType: (sortType: 'rating' | 'createdAt') => void;
  sortType: 'rating' | 'createdAt';
};

export const Sort = ({
  filterArr,
  setSelectedFilters,
  selectedFilters,
  setSortType,
  sortType,
}: SortProps) => {
  const [isSort, setIsSort] = useState<boolean>(false);

  const handleFilterToggle = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="all__block-sort">
      <div onClick={() => setIsSort(!isSort)} className="all__block-sort-sort">
        <svg
          style={{ marginRight: '12px' }}
          fill="white"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24.75 24.75">
          <g>
            <path
              d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
              c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
              c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
            />
          </g>
        </svg>
        {isSort ? 'Сортировка' : 'По популярности'}
        {isSort && (
          <div className="all__block-sort-sort-block">
            <div
              className={`all__block-sort-sort-el all__block-sort-sort-el-rating ${
                sortType === 'rating' ? 'active' : ''
              }`}
              onClick={() => {
                setSortType('rating');
                setIsSort(false);
              }}>
              По популярности
            </div>
            <div
              className={`all__block-sort-sort-el all__block-sort-sort-el-new ${
                sortType === 'createdAt' ? 'active' : ''
              }`}
              onClick={() => {
                setSortType('createdAt');
                setIsSort(false);
              }}>
              По новизне
            </div>
          </div>
        )}
      </div>
      <div className="all__block-sort-filter">
        {filterArr.map((el, index) => {
          if (index >= 2) {
            const isActive = selectedFilters.includes(el);
            return (
              <div
                className={`all__block-sort-filter-el ${isActive ? 'active' : ''}`}
                key={index}
                onClick={() => handleFilterToggle(el)}>
                {el}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
