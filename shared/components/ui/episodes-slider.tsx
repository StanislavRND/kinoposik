'use client';

import { Episode, Seasons } from '@/shared/types/Media';
import { useState } from 'react';

interface Props {
  activeSeason: number;
  seasons: Seasons[];
}

export const EpisodesSlider = ({ activeSeason, seasons }: Props) => {
  const itemsToShow = 4;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    if (currentIndex < seasons[activeSeason].episodes.length - itemsToShow + 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const episodes = seasons[activeSeason].episodes.sort((a, b) => a.number - b.number);

  return (
    <div className="slider__wrapper">
      <div className="slider__episodes">
        <div
          className="slider__episodes-flex"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
          {episodes.map((item: Episode, index: number) => (
            <div className="slider__episodes-episode" key={index}>
              <img className="slider__episodes-episode-img" src={item.imageUrl} alt="" />
              <div className="slider__episodes-episode-number">{item.number} серия</div>
              <span className="slider__episodes-episode-duration">{item.duration} мин</span>
              <p className="slider__episodes-episode-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <>
        {currentIndex > 0 && (
          <button className="slider__episodes-arrow-left" onClick={prevSlide}>
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
        {currentIndex < seasons[activeSeason].episodes.length - itemsToShow && (
          <button className="slider__episodes-arrow-right" onClick={nextSlide}>
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
