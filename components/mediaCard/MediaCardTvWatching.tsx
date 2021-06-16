import {
  CheckIcon,
  ClipboardCopyIcon,
  ReplyIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useGetEpisode, useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import { isDateInFuture } from "../../types/date";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getPrevEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import AirDateCountLabel from "../dataDisplay/AirDateCountLabel";
import LoadingDots from "../feedback/LoadingDots";
import MediaStatusLabel from "../dataDisplay/MediaStatusLabel";
import ProgressBar from "../dataDisplay/ProgressBar";
import MediaCardWrapper from "./MediaCardWrapper";
import UpdateNumberOfWatchedEpisodesButton from "../dataEntry/UpdateNumberOfWatchedEpisodesButton";
import EpisodeNumberLabel from "../dataDisplay/EpisodeNumberLabel";
import UpdateWatchStatusButton from "../dataEntry/UpdateWatchStatusButton";
import { WatchStatus } from "../../types/status";

type MediaCardTvWatchingProps = {
  tv: Tv;
};

function MediaCardTvWatching({ tv }: MediaCardTvWatchingProps) {
  // get all seasons
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);

  // episode numbers and watchedEpisodeCount
  const [prevEpisode, setPrevEpisode] = useState<EpisodeNumber>();
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
    setPrevEpisode(getPrevEpisode(seasonsData?.tvSeasons, lastWatchedEpisode));
    setNextEpisode(getNextEpisode(seasonsData?.tvSeasons, lastWatchedEpisode));
  }, [lastWatchedEpisode]);

  // get next episode
  const {
    data: nextEpisodeData,
    loading: nextEpisodeLoading,
    error: nextEpisodeError,
  } = useGetEpisode(tv.code, nextEpisode?.season, nextEpisode?.episode);

  // check validity of next episode
  const [isNextEpisodeValid, setIsNextEpisodeValid] = useState<boolean>(false);
  useEffect(() => {
    console.log(tv.title);
    console.log(nextEpisodeData);
    if (
      nextEpisodeData != null &&
      !nextEpisodeLoading &&
      !nextEpisodeError &&
      nextEpisodeData.episode.airDate != null &&
      nextEpisodeData.episode.airDate !== "" &&
      !isDateInFuture(new Date(nextEpisodeData.episode.airDate))
    ) {
      setIsNextEpisodeValid(true);
    } else {
      setIsNextEpisodeValid(false);
    }
  }, [nextEpisodeData, nextEpisodeLoading, nextEpisodeError]);

  // check validity of last watched episode
  const [isLastWatchedEpisodeValid, setIsLastWatchedEpisodeValid] =
    useState<boolean>(false);
  useEffect(() => {
    if (
      lastWatchedEpisode != null &&
      JSON.stringify(lastWatchedEpisode) !==
        JSON.stringify({ season: 1, episode: 0 })
    ) {
      setIsLastWatchedEpisodeValid(true);
    } else {
      setIsLastWatchedEpisodeValid(false);
    }
  }, [lastWatchedEpisode]);

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        {lastWatchedEpisode == null ? (
          <LoadingDots />
        ) : nextEpisode != null ? (
          <div className="flex flex-row">
            <EpisodeNumberLabel episodeNumber={nextEpisode} />
            {nextEpisodeData == null || nextEpisodeLoading ? (
              <LoadingDots className="ml-2" />
            ) : isNextEpisodeValid ? (
              <>
                <div className="mx-1">•</div>
                <div className="font-medium truncate">
                  {nextEpisodeData.episode.title}
                </div>
              </>
            ) : (
              <AirDateCountLabel episode={nextEpisodeData.episode} />
            )}
          </div>
        ) : (
          <MediaStatusLabel media={tv} />
        )}

        <div className="flex flex-row -mb-1">
          <ProgressBar
            progress={watchedEpisodeCount}
            limit={tv.numberOfEpisodes}
            className="my-1"
          />
          <div className="text-sm font-medium text-gray-500 ml-2">
            {watchedEpisodeCount}/{tv.numberOfEpisodes}
          </div>
        </div>
        <div className="flex flex-row py-2">
          <UpdateNumberOfWatchedEpisodesButton
            disabled={!isLastWatchedEpisodeValid}
            tv={tv}
            season={lastWatchedEpisode?.season}
            numberOfWatchedEpisodes={lastWatchedEpisode?.episode - 1}
            onClick={() => {
              if (prevEpisode != null) {
                setLastWatchedEpisode(prevEpisode);
              } else {
                setLastWatchedEpisode({
                  season: 1,
                  episode: 0,
                });
              }
              setWatchedEpisodeCount(watchedEpisodeCount - 1);
            }}
            className="button mr-3"
          >
            <ReplyIcon className="h-5 w-5 m-1.5 flex-shrink-0" />
          </UpdateNumberOfWatchedEpisodesButton>
          <UpdateNumberOfWatchedEpisodesButton
            disabled={!isNextEpisodeValid}
            tv={tv}
            season={nextEpisode?.season}
            numberOfWatchedEpisodes={nextEpisode?.episode}
            onClick={() => {
              setLastWatchedEpisode(nextEpisode);
              setWatchedEpisodeCount(watchedEpisodeCount + 1);
            }}
            className="button buttonStandard"
          >
            <CheckIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
            <div>Episode watched</div>
          </UpdateNumberOfWatchedEpisodesButton>
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvWatching;
