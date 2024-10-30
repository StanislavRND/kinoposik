'use client'

import { useState } from 'react';

type SortProps = {
  filterArr: string[];
};

export const Sort = ({ filterArr }: SortProps) => {
  const [activeFilterIndices, setActiveFilterIndices] = useState<number[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false);

  const handleFilterIndex = (index: number) => {
    if (activeFilterIndices.includes(index)) {
      setActiveFilterIndices(activeFilterIndices.filter((i) => i !== index));
    } else {
      setActiveFilterIndices([...activeFilterIndices, index]);
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
        По популярности
        {isSort && (
          <div className="all__block-sort-sort-block">
            <div className="all__block-sort-sort-el  all__block-sort-sort-el-rating">
              По популярности
            </div>
            <div className="all__block-sort-sort-el  all__block-sort-sort-el-new">По новизне</div>
          </div>
        )}
      </div>
      <div className="all__block-sort-filter">
        {filterArr.map((el, index) => {
          if (index >= 2) {
            return (
              <div
                className={`all__block-sort-filter-el ${
                  activeFilterIndices.includes(index) ? 'active' : ''
                }`}
                key={index}
                onClick={() => handleFilterIndex(index)}>
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
