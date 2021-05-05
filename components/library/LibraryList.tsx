import { Media } from "../../lib/api/consumat-io";
import LibraryItem from "./LibraryItem";

type LibraryListProps = {
  mediaList: Media[];
};

const LibraryList = ({ mediaList }: LibraryListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {mediaList.map((media, i) => (
          <LibraryItem key={i} media={media} />
        ))}
      </ul>
    </div>
  );
};

export default LibraryList;
