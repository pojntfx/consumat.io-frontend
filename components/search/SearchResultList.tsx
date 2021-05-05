import { Media } from "../../lib/api/consumat-io";
import SearchResultItem from "./SearchResultItem";

type SearchResultListProps = {
  mediaList: Media[];
};

const SearchResultList = ({ mediaList }: SearchResultListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {mediaList.map((media, i) => (
          <SearchResultItem key={i} media={media} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
