import {
  EyeIcon,
  CalendarIcon,
  CheckIcon,
  ReplyIcon,
  EyeOffIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  useGetEpisode,
  useGetTvSeasons,
  useSetNumberOfWatchedEpisodes,
} from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  daysUntilDate,
  isDateInFuture,
  isDateInPresent,
} from "../../types/date";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getPrevEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import { StatusTv } from "../../types/status";
import LoadingDots from "../helper/LoadingDots";
import Progressbar from "../helper/Progressbar";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvWatchingProps = {
  tv: Tv;
};

function MediaCardTvWatching({ tv }: MediaCardTvWatchingProps) {
  // mutation for updating progress of watched episodes
  const [updateNumberOfWatchedEpisodes, { data, loading, error }] =
    useSetNumberOfWatchedEpisodes();

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

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        {lastWatchedEpisode == null ? (
          <LoadingDots />
        ) : nextEpisode != null ? (
          <div className="flex flex-row">
            <div className="font-medium">
              S
              {nextEpisode.season.toLocaleString("en", {
                minimumIntegerDigits: 2,
              })}
            </div>
            <div className="-mx-0.5 font-medium">︱</div>
            <div className="font-medium">
              E
              {nextEpisode.episode.toLocaleString("en", {
                minimumIntegerDigits: 2,
              })}
            </div>
            {nextEpisodeData == null ? (
              <LoadingDots className="ml-2" />
            ) : nextEpisodeData.episode.airDate != null &&
              nextEpisodeData.episode.airDate !== "" &&
              !isDateInFuture(new Date(nextEpisodeData.episode.airDate)) ? (
              <>
                <div className="mx-1">•</div>
                <div className="font-medium truncate">
                  {nextEpisodeData.episode.title}
                </div>
              </>
            ) : (
              <>
                {nextEpisodeData.episode.airDate == null ||
                nextEpisodeData.episode.airDate == "" ? (
                  <>
                    <EyeIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
                    <div className="font-medium truncate italic text-gray-500">
                      {tv.status == StatusTv.ReturningSeries
                        ? "returning"
                        : "upcoming"}
                    </div>
                  </>
                ) : isDateInPresent(
                    new Date(nextEpisodeData.episode.airDate)
                  ) ? (
                  <>
                    <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
                    <div className="font-medium truncate italic text-gray-500">
                      today
                    </div>
                  </>
                ) : (
                  <>
                    <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
                    <div className="font-medium truncate italic text-gray-500">
                      {daysUntilDate(
                        new Date(nextEpisodeData.episode.airDate)
                      ) + " days"}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-row">
            {tv.status == StatusTv.ReturningSeries ? (
              <>
                <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
                <div className="font-medium truncate italic text-gray-500">
                  returning
                </div>
              </>
            ) : tv.status == StatusTv.Canceled ? (
              <>
                <EyeOffIcon className="h-6 w-5 mr-1 text-gray-500" />
                <div className="font-medium truncate italic text-gray-500">
                  canceled
                </div>
              </>
            ) : tv.status == StatusTv.Ended ? (
              <>
                <EyeOffIcon className="h-6 w-5 mr-1 text-gray-500" />
                <div className="font-medium truncate italic text-gray-500">
                  ended
                </div>
              </>
            ) : (
              <>
                <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
                <div className="font-medium truncate italic text-gray-500">
                  upcoming
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex flex-row -mb-1">
          <Progressbar
            progress={watchedEpisodeCount}
            limit={tv.numberOfEpisodes}
            className="my-1"
          />
          <div className="text-sm font-medium text-gray-500 ml-2">
            {watchedEpisodeCount}/{tv.numberOfEpisodes}
          </div>
        </div>
        <div className="flex flex-row items-center py-2">
          <button
            disabled={
              lastWatchedEpisode == null ||
              JSON.stringify(lastWatchedEpisode) ===
                JSON.stringify({ season: 1, episode: 0 })
            }
            onClick={() => {
              if (
                lastWatchedEpisode != null &&
                JSON.stringify(lastWatchedEpisode) !==
                  JSON.stringify({ season: 1, episode: 0 })
              ) {
                updateNumberOfWatchedEpisodes({
                  variables: {
                    code: tv.code,
                    seasonNumber: lastWatchedEpisode.season,
                    numberOfWatchedEpisodes: lastWatchedEpisode.episode - 1,
                  },
                });
                if (prevEpisode != null) {
                  setLastWatchedEpisode(prevEpisode);
                } else {
                  setLastWatchedEpisode({ season: 1, episode: 0 });
                }
                setWatchedEpisodeCount(watchedEpisodeCount - 1);
              }
            }}
            className="button mr-3"
          >
            <ReplyIcon className="h-5 w-5 m-1.5" />
          </button>
          <button
            disabled={!isNextEpisodeValid}
            onClick={() => {
              if (isNextEpisodeValid) {
                updateNumberOfWatchedEpisodes({
                  variables: {
                    code: tv.code,
                    seasonNumber: nextEpisode.season,
                    numberOfWatchedEpisodes: nextEpisode.episode,
                  },
                });
                setLastWatchedEpisode(nextEpisode);
                setWatchedEpisodeCount(watchedEpisodeCount + 1);
              }
            }}
            className="button text-sm w-max py-1.5 pl-1.5 pr-3 flex flex-row truncate"
          >
            <CheckIcon className="h-6 w-6 mr-1 -my-0.5" />
            <div>Episode Watched</div>
          </button>
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvWatching;
