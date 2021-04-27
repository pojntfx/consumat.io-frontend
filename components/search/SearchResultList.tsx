import { Movie, Tv } from "../../lib/api/consumat-io";
import SearchResultItem from "./SearchResultItem";
import styles from "../../styles/Search.module.css";

type SearchResultListProps = {
  searchResults: Movie[];
};

const SearchResultList = ({ searchResults }: SearchResultListProps) => {
  return (
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
  );
};

export default SearchResultList;
