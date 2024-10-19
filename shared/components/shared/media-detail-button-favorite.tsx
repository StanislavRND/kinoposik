'use client';

import { deleteFavorites, postFavorites } from '@/shared/services/users';
import { Favorite } from '@/shared/types/Favorite';
import { User } from '@/shared/types/User';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FavoriteIcon } from '../ui';

interface Props {
  userData: User;
  mediaId: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: number;
}

export const MediaDetailButtonFavorite: React.FC<Props> = ({
  userData,
  mediaId,
  isAuthenticated,
  isLoading,
  userId,
}: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userData?.favorites.some((favorite: Favorite) => favorite.mediaId === mediaId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [userData, mediaId]);

  const handleFavorites = async () => {
    try {
      if (isFavorite) {
        await deleteFavorites(mediaId);
        setIsFavorite(false);
      } else {
        await postFavorites(userId, mediaId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Ошибка при отправке оценки:', error);
    }
  };

  return (
    <button
      className="full-film__detail-flex-buttons-favorites"
      style={{
        cursor: !isAuthenticated ? 'not-allowed' : 'pointer',
      }}
      onClick={() => handleFavorites()}
      disabled={!isAuthenticated}>
      {isLoading ? (
        <CircularProgress
          size={20}
          sx={{
            color: 'white',
          }}
        />
      ) : (
        <FavoriteIcon isFavorite={isFavorite} />
      )}
    </button>
  );
};
