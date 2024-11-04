'use client';

import { ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const SearchCom: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      } else {
        router.push('/search?query=');
      }
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, router]);

  return (
    <>
      <div onClick={() => router.push('/')} className="search__container-back">
        <ArrowLeft style={{ color: 'white' }} />
        Назад
      </div>
      <form className="header__form-search" onSubmit={(e) => e.preventDefault()}>
        <label>
          <Search style={{ color: 'white' }} />
        </label>
        <input
          className="header__sort search__container-input"
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </>
  );
};
