import { Actors, Rating } from '@prisma/client';
import { Genre } from './Genre';

export interface Media {
  id: number;
  name: string;
  country: string;
  genres: Genre[];
  rating: GLfloat | null;
  minYearShow: number;
  imageUrl: string;
  imageUrlTitle: string;
  imageUrlFavorite: string;
  description: string;

  rangeYears: string | null;
  yearPublishing: number | null;
  duration: number | null;
  createdAt: Date;
  seasons: Seasons[];
  actors: Actors[];
  ratings: Rating[];
}

export interface Seasons {
  id: number;
  seriasId: number;
  number: number;
  yearPublishing: number;
  episodes: Episode[];
  description: string;
}

export interface Episode {
  id: number;
  episodeId: number;
  duration: number;
  number: number;
  description: string;
  imageUrl: string;
}
