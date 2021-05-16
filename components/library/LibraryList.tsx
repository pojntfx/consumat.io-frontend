import { Media } from "../../lib/api/consumat-io";
import { WatchStatus } from "../../types/status";
import LibraryItem from "./LibraryItem";

type LibraryListProps = {
  mediaList: Media[];
  watchStatus: WatchStatus;
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
