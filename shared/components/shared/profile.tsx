'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Profile = () => {
  const pathname = usePathname();

  return (
    <div className="profile__nav">
      <ul className="profile__items">
        <li className="profile__item">
          <Link
            href={'/profile/favorites'}
            className={pathname === '/profile/favorites' ? 'active' : ''}>
            Избранное
          </Link>
        </li>
        <li className="profile__item">
          <Link
            href={'/profile/subscriptions'}
            className={pathname === '/profile/subscriptions' ? 'active' : ''}>
            Мои подписки
          </Link>
        </li>
        <li className="profile__item">
          <Link href={'/home'} className={pathname === '/home' ? 'active' : ''}>
            Выход
          </Link>
        </li>
      </ul>
    </div>
  );
};
