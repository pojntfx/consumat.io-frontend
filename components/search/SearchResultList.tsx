import { Media } from "../../lib/api/consumat-io";
import MediaCardSearch from "../MediaCard/MediaCardSearch";

type SearchResultListProps = {
  mediaList: Media[];
};

const SearchResultList = ({ mediaList }: SearchResultListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {mediaList.map((media, i) => (
          <MediaCardSearch key={i} media={media} className="mb-3" />
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
