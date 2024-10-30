'use client';

import { FavoriteContent, Profile } from '@/shared/components';
import { getFavorites } from '@/shared/services/users';
import { useEffect, useState } from 'react';

const ProfileFavorite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setFavorites(result);
        setIsLoading(false);
      } catch (error) {
        console.log('Ошибка получения данных', error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="profile">
      <div className="profile__container container ">
        <Profile />
        {isLoading ? (
          <div style={{ color: 'white' }}>Загрузка...</div>
        ) : (
          <FavoriteContent favorites={favorites} />
        )}
      </div>
    </div>
  );
};

export default ProfileFavorite;
