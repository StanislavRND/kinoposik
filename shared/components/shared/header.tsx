'use client';

import { useUserData } from '@/shared/hooks/use-user';
import { checkAuth, logout } from '@/shared/services/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SkeletonHeader } from '../ui/index';
import { ModalAuth } from './auth/index';
import { Menu } from './index';

export const Header: React.FC = ({}) => {
  const [isModal, setIsModal] = useState(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userData = useUserData();

  const handleMenuUser = () => {
    setUserMenu(!userMenu);
  };

  const handleLogoutUser = async () => {
    try {
      if (userData) {
        await logout(userData.id);
        setUserMenu(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Ошибка выхода из аккаунта', error);
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setIsLoading(true);
        const result = await checkAuth();
        setIsAuthenticated(result);
      } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return <SkeletonHeader />;
  }

  return (
    <header className="header">
      {isLoading && <div className="overlay"></div>}
      <div className="header__container container">
        <div className="header__logo">
          <Link href="/">КИНОПОСИК</Link>
        </div>
        <form className="header__form-search">
          <label>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px">
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </label>
          <Link href={'/search'}>
            {' '}
            <input className="header__sort" type="text" placeholder="Фильм" />
          </Link>
        </form>
        {!isAuthenticated ? (
          <button
            onClick={() => {
              setIsModal(true);
              document.body.style.overflow = 'hidden';
            }}
            className="header__button">
            Войти
          </button>
        ) : (
          <button onClick={handleMenuUser} className="header__button-user">
            <svg
              fill="none"
              height="24"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}
        {userMenu && userData && (
          <Menu userPhone={userData.phone} handleLogoutUser={handleLogoutUser} />
        )}
        <div className="header__items">
          <Link href={'/films'}>
            <div className="header__item">Фильмы</div>
          </Link>
          <Link href={'/series'}>
            <div className="header__item">Сериалы</div>
          </Link>
        </div>
        {isModal && <ModalAuth setIsAuthenticated={setIsAuthenticated} setIsModal={setIsModal} />}
      </div>
    </header>
  );
};
