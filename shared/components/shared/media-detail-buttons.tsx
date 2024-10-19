'use client';

import { useUserData } from '@/shared/hooks/use-user';
import { putRating } from '@/shared/services/rating';
import React, { useState } from 'react';
import { AlertShow, ButtonShow } from '../ui';
import { MediaDetailButtonFavorite } from './media-detail-button-favorite';
import { MediaDetailButtonGrade } from './media-detail-button-grade';
import { ModalGrade } from './modal-grade';

interface Props {
  isAuthenticated: boolean;
  isGrade: boolean;
  setIsGrade: React.Dispatch<React.SetStateAction<boolean>>;
  mediaId: number;
  isLoading: boolean;
}

export const MediaDetailButtons: React.FC<Props> = ({
  isAuthenticated,
  setIsGrade,
  isGrade,
  mediaId,
  isLoading,
}) => {
  const [, setGrade] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>(
    'info',
  );
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isActiveGrade, setIsActiveGrade] = useState(false);
  const [activeScore, setActiveScore] = useState<number | undefined>(undefined);

  const userData = useUserData();
  const userId: number = userData?.id ?? 0;

  const handleRateMedia = async (newGrade: number) => {
    setAlertMessage('Оценка отправляется');
    setAlertSeverity('info');
    setShowAlert(true);
    setIsGrade(false);
    setIsLoadingFetch(true);
    try {
      await putRating(mediaId, userId, newGrade);
      setAlertMessage('Вы поставили оценку');
      setAlertSeverity('success');
      setIsLoadingFetch(false);
      setIsActiveGrade(true);
    } catch (error) {
      console.error('Ошибка при отправке оценки:', error);
      setAlertMessage('Ошибка при отправке оценки');
      setAlertSeverity('error');
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="full-film__detail-flex-buttons">
      <ButtonShow />
      <MediaDetailButtonFavorite
        mediaId={mediaId}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        userData={userData}
        userId={userId}
      />
      <MediaDetailButtonGrade
        mediaId={mediaId}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        userData={userData}
        userId={userId}
        setIsActiveGrade={setIsActiveGrade}
        setActiveScore={setActiveScore}
        setIsGrade={setIsGrade}
        isGrade={isGrade}
        isLoadingFetch={isLoadingFetch}
        isActiveGrade={isActiveGrade}
      />
      {isGrade && (
        <ModalGrade
          score={activeScore}
          setActiveScore={setActiveScore}
          setGrade={setGrade}
          handleRateMedia={handleRateMedia}
        />
      )}
      {showAlert && (
        <AlertShow
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
          setShowAlert={setShowAlert}
        />
      )}
    </div>
  );
};
