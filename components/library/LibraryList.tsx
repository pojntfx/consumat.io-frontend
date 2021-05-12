import { Media } from "../../lib/api/consumat-io";
import { watchStatus } from "../../types/status";
import LibraryItem from "./LibraryItem";

type LibraryListProps = {
  mediaList: Media[];
  watchStatus: watchStatus;
};

const LibraryList = ({ mediaList, watchStatus }: LibraryListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {mediaList
          .filter((media) => media.watchStatus == watchStatus)
          .map((media, i) => (
            <LibraryItem key={i} media={media} />
          ))}
      </ul>
    </div>
  );
};

export default LibraryList;
