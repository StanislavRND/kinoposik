import { Media } from './Media';
import { User } from './User';

export interface Favorite {
  id: number;
  userId: number;
  mediaId: number;
  user: User;
  media: Media;
}
