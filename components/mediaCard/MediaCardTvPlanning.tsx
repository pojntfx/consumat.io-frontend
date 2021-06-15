import React, { useEffect, useState } from "react";
import { useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { WatchStatus } from "../../types/status";
import LoadingDots from "../helper/LoadingDots";
import MediaStatus from "../helper/MediaStatus";
import WatchStatusButton from "../helper/WatchStatusButton";
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
          <WatchStatusButton media={tv} watchStatus={WatchStatus.Watching} />
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
