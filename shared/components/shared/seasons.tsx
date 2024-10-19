'use client';

import { Media } from '@/shared/types/Media';
import React from 'react';
import { EpisodesSlider } from '../ui';

interface Props {
  mediaDetail: Media;
  activeSeason: number;
  setActiveSeason: React.Dispatch<React.SetStateAction<number>>;
}

export const Seasons: React.FC<Props> = ({ activeSeason, setActiveSeason, mediaDetail }) => {
  return (
    <div>
      <div className="full-film__seasons">
        <div className="full-film__seasons-numbers">
          <div className="full-film__seasons-name">Сезон</div>
          <div className="full-film__seasons-number">
            {mediaDetail.seasons.map((_, index) => (
              <div
                onClick={() => setActiveSeason(index)}
                style={{ backgroundColor: activeSeason === index ? '#292929' : '' }}
                key={index}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <EpisodesSlider activeSeason={activeSeason} seasons={mediaDetail.seasons} />
      </div>
    </div>
  );
};
