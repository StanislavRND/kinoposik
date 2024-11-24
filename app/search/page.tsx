'use client';

import { SearchCom, SearchResult } from '@/shared/components';
import { Suspense } from 'react';

const SearchPage = () => {
  return (
    <>
      <Suspense fallback={<div>Загрузка...</div>}>
        <div className="search__container">
          <div className="search__header">
            <SearchCom />
          </div>
          <SearchResult />
        </div>
      </Suspense>
    </>
  );
};

export const dynamic = 'force-dynamic';

export default SearchPage;
