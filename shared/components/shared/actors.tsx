'use client';

import { Media } from '@/shared/types/Media';
import React from 'react';
import { ActorsSlider } from '../ui/actors-slider';

interface Props {
  mediaDetail: Media;
}

export const Actors: React.FC<Props> = ({ mediaDetail }) => {
  return (
    <div className="full-film__actors">
      <div className="full-film__seasons-numbers ">
        <div className="full-film__seasons-name">Создатели и актёры</div>
      </div>
      <ActorsSlider actors={mediaDetail.actors} />
    </div>
  );
};
