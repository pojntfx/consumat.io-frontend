import React, { useEffect, useState } from "react";
import { useGetEpisode, useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { WatchStatus } from "../../types/status";
import LoadingDots from "../feedback/LoadingDots";
import MediaStatusLabel from "../dataDisplay/MediaStatusLabel";
import UpdateWatchStatusButton from "../dataEntry/UpdateWatchStatusButton";
import MediaCardWrapper from "./MediaCardWrapper";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import EpisodeNumberLabel from "../dataDisplay/EpisodeNumberLabel";
import { isDateInFuture } from "../../types/date";
import AirDateCountLabel from "../dataDisplay/AirDateCountLabel";

type MediaCardTvPlanningProps = {
  tv: Tv;
};

function MediaCardTvPlanning({ tv }: MediaCardTvPlanningProps) {
  // get all seasons
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);

  // episode numbers and watchedEpisodeCount
  const [lastWatchedEpisode, setLastWatchedEpisode] = useState<EpisodeNumber>();
  const [nextEpisode, setNextEpisode] = useState<EpisodeNumber>();
  const [watchedEpisodeCount, setWatchedEpisodeCount] = useState<number>(0);
  // - get inititial last watched episode number and watchedEpisodeCount
  useEffect(() => {
    if (seasonsData != null) {
      setLastWatchedEpisode(getLastWatchedEpisode(seasonsData.tvSeasons));
      setWatchedEpisodeCount(getWatchedEpisodeCount(seasonsData.tvSeasons));
    }
  }, [seasonsData]);
  // - update episode numbers
  useEffect(() => {
    setNextEpisode(getNextEpisode(seasonsData?.tvSeasons, lastWatchedEpisode));
  }, [lastWatchedEpisode]);

  // get next episode
  const {
    data: nextEpisodeData,
    loading: nextEpisodeLoading,
    error: nextEpisodeError,
  } = useGetEpisode(tv.code, nextEpisode?.season, nextEpisode?.episode);

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        <div className="h-12">
          {watchedEpisodeCount == tv.numberOfEpisodes ? (
            lastWatchedEpisode != null ? (
              <div className="font-medium truncate">{`Season ${
                lastWatchedEpisode.season + 1
              }`}</div>
            ) : (
              <LoadingDots />
            )
          ) : nextEpisodeData != null ? (
            <div className="flex flex-row">
              <EpisodeNumberLabel episodeNumber={nextEpisode} />
              <AirDateCountLabel episode={nextEpisodeData?.episode} />
            </div>
          ) : (
            <LoadingDots />
          )}
        </div>

        <UpdateWatchStatusButton
          media={tv}
          watchStatus={WatchStatus.Watching}
          className="button buttonStandard"
        >
          <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
          <div>{"Move to " + WatchStatus.Watching}</div>
        </UpdateWatchStatusButton>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
