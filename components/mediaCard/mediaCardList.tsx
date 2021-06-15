import { Media } from "../../lib/api/consumat-io";
import { isMovieList, isTvList } from "../../types/media";
import { WatchStatus } from "../../types/status";
import MediaCardMovieDropped from "./MediaCardMovieDropped";
import MediaCardMovieFinished from "./MediaCardMovieFinished";
import MediaCardMoviePlanning from "./MediaCardMoviePlanning";
import MediaCardSearch from "./MediaCardSearch";
import MediaCardTvDropped from "./MediaCardTvDropped";
import MediaCardTvFinished from "./MediaCardTvFinished";
import MediaCardTvPlanning from "./MediaCardTvPlanning";
import MediaCardTvWatching from "./MediaCardTvWatching";

type MediCardListProps = {
  mediaList: Media[];
  watchStatus?: WatchStatus;
};

const MediCardList = ({ mediaList, watchStatus }: MediCardListProps) => {
  return (
    <div className="overscroll-none">
      <ul>
        {watchStatus == null &&
          mediaList.map((media, i) => (
            <MediaCardSearch key={i} media={media} />
          ))}
        {isTvList(mediaList) &&
          (watchStatus == WatchStatus.Watching
            ? mediaList.map((tv, i) => <MediaCardTvWatching key={i} tv={tv} />)
            : watchStatus == WatchStatus.Planning
            ? mediaList.map((tv, i) => <MediaCardTvPlanning key={i} tv={tv} />)
            : watchStatus == WatchStatus.Dropped
            ? mediaList.map((tv, i) => <MediaCardTvDropped key={i} tv={tv} />)
            : watchStatus == WatchStatus.Finished &&
              mediaList.map((tv, i) => (
                <MediaCardTvFinished key={i} tv={tv} />
              )))}
        {isMovieList(mediaList) &&
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

export default MediCardList;
