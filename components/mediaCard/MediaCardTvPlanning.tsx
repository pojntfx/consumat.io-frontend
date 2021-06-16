import React, { useEffect, useState } from "react";
import { useGetEpisode, useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { StatusTv, WatchStatus } from "../../types/status";
import LoadingDots from "../feedback/LoadingDots";
import MediaStatusLabel from "../dataDisplay/MediaStatusLabel";
import UpdateWatchStatusButton from "../dataEntry/UpdateWatchStatusButton";
import MediaCardWrapper from "./MediaCardWrapper";
import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
} from "@heroicons/react/outline";
import EpisodeNumberLabel from "../dataDisplay/EpisodeNumberLabel";
import AirDateCountLabel from "../dataDisplay/AirDateCountLabel";
import ReleaseDateLabel from "../dataDisplay/ReleaseDateLabel";

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

  // check if series finished
  const [isFinished, setIsFinished] = useState<boolean>(false);
  useEffect(() => {
    if (
      watchedEpisodeCount == tv.numberOfEpisodes &&
      (tv.status == StatusTv.Canceled || tv.status == StatusTv.Ended)
    ) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [watchedEpisodeCount]);

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        <div className="h-12">
          {isFinished ? (
            <div>
              <MediaStatusLabel media={tv} />
              <div className="font-medium text-sm truncate">
                {`after ${tv.numberOfSeasons} ${
                  tv.numberOfSeasons == 1 ? "Season" : "Seasons"
                }`}
              </div>
            </div>
          ) : lastWatchedEpisode == null ? (
            <LoadingDots />
          ) : nextEpisode != null ? (
            nextEpisodeData == null ? (
              <LoadingDots />
            ) : (
              <div className="flex flex-row mb-1">
                <EpisodeNumberLabel episodeNumber={nextEpisode} />
                <div className="ml-2">
                  <AirDateCountLabel
                    episode={nextEpisodeData.episode}
                    className="-mb-1"
                  />
                  <ReleaseDateLabel episode={nextEpisodeData.episode} />
                </div>
              </div>
            )
          ) : (
            <div>
              <MediaStatusLabel media={tv} />
              <div className="font-medium text-sm truncate">
                {`with Season ${tv.numberOfSeasons + 1}`}
              </div>
            </div>
          )}
        </div>

        <UpdateWatchStatusButton
          media={tv}
          watchStatus={isFinished ? WatchStatus.Finished : WatchStatus.Watching}
          className="button buttonStandard"
        >
          {isFinished ? (
            <>
              <ClipboardCheckIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
              <div>{`Move to ${WatchStatus.Finished}`}</div>
            </>
          ) : (
            <>
              <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
              <div>{`Move to ${WatchStatus.Watching}`}</div>
            </>
          )}
        </UpdateWatchStatusButton>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
