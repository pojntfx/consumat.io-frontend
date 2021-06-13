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
import { WatchStatus } from "../../types/status";
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
          {watchedEpisodeCount < tv.numberOfEpisodes ? (
            lastWatchedEpisode != null ? (
              <div className="flex flex-row">
                <div className="font-medium">
                  S
                  {getNextEpisode(
                    seasonsData.tvSeasons,
                    lastWatchedEpisode
                  ).season.toLocaleString("en", {
                    minimumIntegerDigits: 2,
                  })}
                </div>
                <div className="-mx-0.5 font-medium">︱</div>
                <div className="font-medium">
                  E
                  {getNextEpisode(
                    seasonsData.tvSeasons,
                    lastWatchedEpisode
                  ).episode.toLocaleString("en", {
                    minimumIntegerDigits: 2,
                  })}
                </div>
              </div>
            ) : (
              <div>...</div>
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
            className="button text-sm py-1.5 px-3"
          >
            Add to Watch
          </button>
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
