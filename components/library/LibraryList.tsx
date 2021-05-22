import { Media } from "../../lib/api/consumat-io";
import { isMovieList, isTvList } from "../../types/media";
import { WatchStatus } from "../../types/status";
import LibraryCardMovie from "./LibraryCardMovie";
import LibraryCardTv from "./LibraryCardTv";

type LibraryListProps = {
  mediaList: Media[];
};

const LibraryList = ({ mediaList }: LibraryListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {isTvList(mediaList)
          ? mediaList.map((tv, i) => <LibraryCardTv key={i} tv={tv} />)
          : isMovieList(mediaList) &&
            mediaList.map((movie, i) => (
              <LibraryCardMovie key={i} movie={movie} />
            ))}
      </ul>
    </div>
  );
};

export default LibraryList;
