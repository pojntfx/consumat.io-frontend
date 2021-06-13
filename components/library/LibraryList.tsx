import { Media } from "../../lib/api/consumat-io";
import { isMovieList, isTvList } from "../../types/media";
import { WatchStatus } from "../../types/status";
import MediaCardMovieDropped from "../mediaCard/MediaCardMovieDropped";
import MediaCardMovieFinished from "../mediaCard/MediaCardMovieFinished";
import MediaCardMoviePlanning from "../mediaCard/MediaCardMoviePlanning";
import MediaCardTvDropped from "../mediaCard/MediaCardTvDropped";
import MediaCardTvFinished from "../mediaCard/MediaCardTvFinished";
import MediaCardTvPlanning from "../mediaCard/MediaCardTvPlanning";
import MediaCardTvWatching from "../mediaCard/MediaCardTvWatching";

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
          : isMovieList(mediaList) &&
            (watchStatus == WatchStatus.Planning
              ? mediaList.map((movie, i) => (
                  <MediaCardMoviePlanning key={i} movie={movie} />
                ))
              : watchStatus == WatchStatus.Dropped
              ? mediaList.map((movie, i) => (
                  <MediaCardMovieDropped key={i} movie={movie} />
                ))
              : watchStatus == WatchStatus.Finished &&
                mediaList.map((movie, i) => (
                  <MediaCardMovieFinished key={i} movie={movie} />
                )))}
      </ul>
    </div>
  );
};

export default LibraryList;
