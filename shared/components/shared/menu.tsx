'use client';

import Link from 'next/link';
import React from 'react';

interface Props {
  handleLogoutUser: () => void;
	userPhone: string;
}

export const Menu: React.FC<Props> = ({ handleLogoutUser, userPhone }: Props) => {
  return (
    <div className="header__modal">
      <div className="header__modal-account">
        <div className="header__modal-logo">
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
        </div>
        <span className="header__modal-phone">{userPhone}</span>
        <nav className="header__modal-nav">
          <ul className="header__modal-items">
            <Link href={'/profile/favorites'}>
              <li className="header__modal-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px">
                  <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z" />
                </svg>
                Избранное
              </li>
            </Link>
            <Link href={'/profile/subscriptions'}>
              <li className="header__modal-item">
                <svg
                  style={{ transform: 'rotate(90deg)', marginLeft: '2px' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="21px"
                  height="21px"
                  viewBox="0 0 24 24">
                  <path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111l-9.707 16.18c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472l-9.707-16.18c-.446-.741-1.205-1.111-1.966-1.111z" />
                </svg>
                Мои подписки
              </li>
            </Link>
            <Link href={'/home'}>
              <li onClick={handleLogoutUser} className="header__modal-item">
                <svg
                  style={{ marginLeft: '3px' }}
                  width="24"
                  height="22"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd">
                  <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
                </svg>
                Выйти из аккаунта
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};
