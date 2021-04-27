import { Result } from "../../lib/api/consumat-io";
import SearchResultItem from "./SearchResultItem";

type SearchResultListProps = {
  searchResults: Result[];
};

const SearchResultList = ({ searchResults }: SearchResultListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {searchResults.map((searchResult) => (
          <SearchResultItem
            key={searchResult.mediaType + searchResult.code}
            searchResult={searchResult}
          />
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
