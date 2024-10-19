import { Rating } from '@prisma/client/wasm';
import { Favorite } from './Favorite';

export interface User {
  id: number;
  phone: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  ratings: Rating[];
  favorites: Favorite[];
}
