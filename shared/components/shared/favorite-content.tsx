import { capitalizeFirstLetter } from '@/shared/lib';
import { Favorite } from '@/shared/types/Favorite';
import Link from 'next/link';

interface Props {
  favorites: Favorite[];
}

export const FavoriteContent: React.FC<Props> = ({ favorites }) => {
  return (
    <div className="profile__favorite-block">
      <h2 className="profile__favorite-block-title">Избранное</h2>
      {favorites.length === 0 ? (
        <div className="profile__favorite-empty">
          Держите под рукой все, что хотите посмотреть{' '}
          <span>Добавляйте фильмы и сериалы с помощью кнопки «В избранное».</span>
        </div>
      ) : (
        <div className="profile__favorite-films">
          {favorites.map((el: Favorite) => (
            <Link href={`/watch/${encodeURIComponent(el.media.name)}`} key={el.media.id}>
              <div key={el.media.id} className="profile__favorite-film">
                <img src={el.media.imageUrlFavorite} alt="" />
                <div className="profile__favorite-film-min-year">{el.media.minYearShow}+</div>
                <div className="profile__favorite-film-rating">{el.media.rating?.toFixed(1)}</div>
                <div className="profile__favorite-film-name">
                  {capitalizeFirstLetter(el.media.name)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
