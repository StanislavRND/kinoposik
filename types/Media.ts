import { Genre } from './Genre';

export interface Media {
  id: number;
  name: string;
  country: string;
  genres: Genre[];
  rating: string;
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
}

interface Seasons {
	id: number;
	seriasId: number;
	number: number;
	yearPublishing: number;
	episodes: Episode[]
}

interface Episode {
	id: number;
	episodeId: number;
	duration: number;
	number: number;
}
