import { Result } from "../../lib/api/consumat-io";
import SearchResultItem from "./SearchResultItem";

type SearchResultListProps = {
  searchResults: Result[];
};

const SearchResultList = ({ searchResults }: SearchResultListProps) => {
  return (
    <div>
      <ul>
        {searchResults.map((searchResult) => (
          <li>
            <SearchResultItem
              key={searchResult.code}
              searchResult={searchResult}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
