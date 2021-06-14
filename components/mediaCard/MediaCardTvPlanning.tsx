import {
  ClipboardCopyIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useGetTvSeasons, useSetWatchStatus } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { MediaType } from "../../types/media";
import { StatusTv, WatchStatus } from "../../types/status";
import LoadingDots from "../helper/LoadingDots";
import MediaStatus from "../helper/MediaStatus";
import ProviderList from "../helper/ProviderList";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvPlanningProps = {
  tv: Tv;
};

function MediaCardTvPlanning({ tv }: MediaCardTvPlanningProps) {
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);

  const [lastWatchedEpisode, setLastWatchedEpisode] = useState<EpisodeNumber>();

  const [watchedEpisodeCount, setWatchedEpisodeCount] = useState<number>(0);

  useEffect(() => {
    if (seasonsData != null) {
      setLastWatchedEpisode(getLastWatchedEpisode(seasonsData.tvSeasons));
      setWatchedEpisodeCount(getWatchedEpisodeCount(seasonsData.tvSeasons));
      //console.log(seasonsData.tvSeasons);
    }
  }, [seasonsData]);

  const [updateWatchStatus, { loading, data, error }] = useSetWatchStatus();

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        <div className="h-10">
          {watchedEpisodeCount <= tv.numberOfEpisodes ? (
            lastWatchedEpisode != null ? (
              <MediaStatus media={tv} />
            ) : (
              <LoadingDots />
            )
          ) : (
            <div></div>
          )}
          {/*<ProviderList providers={tv.providers} />*/}
        </div>
        <div className="flex flex-row py-2">
          <button
            onClick={() =>
              updateWatchStatus({
                variables: {
                  code: tv.code,
                  type: MediaType.Tv,
                  watchStatus: WatchStatus.Watching,
                },
              })
            }
            className="button text-sm w-max py-1.5 pl-1.5 pr-3 flex flex-row truncat"
          >
            <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5" />
            <div>Move to Watching</div>
          </button>
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
