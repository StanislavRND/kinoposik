import { SearchCom, SearchResult } from '@/shared/components';

const SearchPage = () => {
  return (
    <>
      <div className="search__container">
        <div className="search__header">
          <SearchCom />
        </div>
        <SearchResult />
      </div>
    </>
  );
};

export default SearchPage;
