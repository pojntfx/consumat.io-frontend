import { Media } from "../../lib/api/consumat-io";
import { isMovieList, isTvList } from "../../types/media";
import { WatchStatus } from "../../types/status";
import MediaCardTvDropped from "../MediaCardList/MediaCardTvDropped";
import MediaCardTvFinished from "../MediaCardList/MediaCardTvFinished";
import MediaCardTvPlanning from "../MediaCardList/MediaCardTvPlanning";
import MediaCardTvWatching from "../MediaCardList/MediaCardTvWatching";

type LibraryListProps = {
  mediaList: Media[];
  watchStatus: WatchStatus;
};

const LibraryList = ({ mediaList, watchStatus }: LibraryListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {isTvList(mediaList)
          ? watchStatus == WatchStatus.Watching
            ? mediaList.map((tv, i) => <MediaCardTvWatching key={i} tv={tv} />)
            : watchStatus == WatchStatus.Planning
            ? mediaList.map((tv, i) => <MediaCardTvPlanning key={i} tv={tv} />)
            : watchStatus == WatchStatus.Dropped
            ? mediaList.map((tv, i) => <MediaCardTvDropped key={i} tv={tv} />)
            : watchStatus == WatchStatus.Finished &&
              mediaList.map((tv, i) => <MediaCardTvFinished key={i} tv={tv} />)
          : isMovieList(mediaList) && mediaList.map((movie, i) => <div></div>)}
      </ul>
    </div>
  );
};

export default LibraryList;
