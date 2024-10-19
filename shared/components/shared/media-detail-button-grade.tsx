'use client';

import { Rating } from '@/shared/types/Rating';
import { User } from '@/shared/types/User';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { StarIcon } from '../ui';

interface Props {
  userData: User;
  mediaId: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: number;
  setIsActiveGrade: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveScore: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIsGrade: React.Dispatch<React.SetStateAction<boolean>>;
  isGrade: boolean;
  isLoadingFetch: boolean;
  isActiveGrade: boolean;
}

export const MediaDetailButtonGrade: React.FC<Props> = ({
  userData,
  mediaId,
  isAuthenticated,
  isLoading,
  setIsActiveGrade,
  setActiveScore,
  setIsGrade,
  isGrade,
  isLoadingFetch,
  isActiveGrade,
}: Props) => {
  useEffect(() => {
    if (userData?.ratings.some((rating: Rating) => rating.mediaId === mediaId)) {
      setIsActiveGrade(true);
    } else {
      setIsActiveGrade(false);
    }

    const ratingArr = userData?.ratings.filter((el: Rating) => el.mediaId === mediaId);
    const score = ratingArr && ratingArr[0]?.score;
    setActiveScore(score);
  }, [userData, mediaId]);

  return (
    <button
      className="full-film__detail-flex-buttons-grade"
      onClick={() => {
        setIsGrade(!isGrade);
      }}
      style={{
        cursor: !isAuthenticated || isLoadingFetch ? 'not-allowed' : 'pointer',
      }}
      disabled={!isAuthenticated || isLoadingFetch}>
      {isLoading ? (
        <CircularProgress
          size={20}
          sx={{
            color: 'white',
          }}
        />
      ) : (
        <StarIcon isActiveGrade={isActiveGrade} />
      )}
    </button>
  );
};
