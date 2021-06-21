import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { WatchStatus } from "../../types/status";
import EpisodeNumberLabel from "../dataDisplay/EpisodeNumberLabel";
import UpdateWatchStatusButton from "../dataEntry/UpdateWatchStatusButton";
import LoadingDots from "../feedback/LoadingDots";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvDroppedProps = {
  tv: Tv;
};

function MediaCardTvDropped({ tv }: MediaCardTvDroppedProps) {
  // get all seasons
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);

  // episode numbers and watchedEpisodeCount
  const [lastWatchedEpisode, setLastWatchedEpisode] = useState<EpisodeNumber>();
  const [watchedEpisodeCount, setWatchedEpisodeCount] = useState<number>(0);

  // - get inititial last watched episode number and watchedEpisodeCount
  useEffect(() => {
    if (seasonsData != null) {
      setLastWatchedEpisode(getLastWatchedEpisode(seasonsData.tvSeasons));
      setWatchedEpisodeCount(getWatchedEpisodeCount(seasonsData.tvSeasons));
    }
  }, [seasonsData]);

  //
  const [isInList, setIsInList] = useState(true);

  return (
    <MediaCardWrapper media={tv}>
      {isInList ? (
        <div className="flex flex-col">
          <div className="h-12">
            {lastWatchedEpisode == null ? (
              <LoadingDots />
            ) : (
              <div>
                <div className="flex flex-row">
                  <div className="font-medium text-gray-500 italic truncate mr-2">
                    Dropped after:
                  </div>
                  <EpisodeNumberLabel episodeNumber={lastWatchedEpisode} />
                </div>
                <div className="font-medium text-sm truncate">
                  {`${tv.numberOfEpisodes - watchedEpisodeCount} ${
                    tv.numberOfEpisodes - watchedEpisodeCount == 1
                      ? "Episode"
                      : "Episodes"
                  } remaining`}
                </div>
              </div>
            )}
          </div>

          <UpdateWatchStatusButton
            media={tv}
            watchStatus={WatchStatus.Watching}
            onCompleted={() => setIsInList(false)}
            className="button buttonStandard"
          >
            <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
            <div>{`Move to ${WatchStatus.Watching}`}</div>
          </UpdateWatchStatusButton>
        </div>
      ) : (
        <div className="h-20 flex items-center">
          <div className="text-lg font-medium italic text-gray-500">
            Moved to {WatchStatus.Watching}
          </div>
        </div>
      )}
    </MediaCardWrapper>
  );
}

export default MediaCardTvDropped;
