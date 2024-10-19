'use client';

import { Actors } from '@/shared/types/Actors';
import { useState } from 'react';
import { FragmentationFullName } from '../shared';

interface Props {
  actors: Actors[];
}

export const ActorsSlider = ({ actors }: Props) => {
  const itemsToShow = 11;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    if (currentIndex < actors.length - itemsToShow + 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((el) => el[0])
      .join('');
  };

  return (
    <div className="slider__wrapper">
      <div className="slider__actors">
        <div
          className="slider__actors-flex"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
          {actors.map((item: Actors, index: number) => (
            <div className="slider__actors-actor" key={index}>
              {item.imgUrl ? (
                <img className="slider__actors-actor-img" src={item.imgUrl} alt="" />
              ) : (
                <div className="slider__actors-actor-initials">
                  <span>{getInitials(item.name)}</span>
                </div>
              )}

              <FragmentationFullName name={item.name} />
              <span className="slider__actors-actor-role">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
      <>
        {currentIndex > 0 && (
          <button className="slider__actors-arrow-left" onClick={prevSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left">
              <path d="m18 25-9-9 9-9" />
            </svg>
          </button>
        )}
        {currentIndex < actors.length - itemsToShow && (
          <button className="slider__actors-arrow-right" onClick={nextSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right">
              <path d="m12 25 9-9-9-9" />
            </svg>
          </button>
        )}
      </>
    </div>
  );
};
