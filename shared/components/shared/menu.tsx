'use client';

import Link from 'next/link';
import React from 'react';
import { FavoriteHeaderIcon, LogoutIcon, SubscriptionIcon, UserIcon } from '../ui';

interface Props {
  handleLogoutUser: () => void;
  userPhone: string;
}

export const Menu: React.FC<Props> = ({ handleLogoutUser, userPhone }: Props) => {
  return (
    <div className="header__modal">
      <div className="header__modal-account">
        <div className="header__modal-logo">
          <UserIcon />
        </div>
        <span className="header__modal-phone">{userPhone}</span>
        <nav className="header__modal-nav">
          <ul className="header__modal-items">
            <Link href={'/profile/favorites'}>
              <li className="header__modal-item">
                <FavoriteHeaderIcon />
                Избранное
              </li>
            </Link>
            <Link href={'/profile/subscriptions'}>
              <li className="header__modal-item">
                <SubscriptionIcon />
                Мои подписки
              </li>
            </Link>
            <Link href={'/'}>
              <li onClick={handleLogoutUser} className="header__modal-item">
                <LogoutIcon />
                Выйти из аккаунта
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};
