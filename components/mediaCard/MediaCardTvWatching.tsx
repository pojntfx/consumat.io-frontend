import { CheckIcon, ReplyIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  useGetEpisode,
  useGetTvSeasons,
  useSetNumberOfWatchedEpisodes,
} from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import {
  EpisodeNumber,
  getLastWatchedEpisode,
  getNextEpisode,
  getPrevEpisode,
  getWatchedEpisodeCount,
} from "../../types/episodeNumber";
import Progressbar from "../helper/Progressbar";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvWatchingProps = {
  tv: Tv;
};

function MediaCardTvWatching({ tv }: MediaCardTvWatchingProps) {
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);

  const [prevEpisode, setPrevEpisode] = useState<EpisodeNumber>();
  const [lastWatchedEpisode, setLastWatchedEpisode] = useState<EpisodeNumber>();
  const [nextEpisode, setNextEpisode] = useState<EpisodeNumber>();

  const [watchedEpisodeCount, setWatchedEpisodeCount] = useState<number>(0);

  useEffect(() => {
    if (!seasonsLoading && !seasonsError) {
      console.log(seasonsData.tvSeasons);
      setLastWatchedEpisode(getLastWatchedEpisode(seasonsData.tvSeasons));
      setWatchedEpisodeCount(getWatchedEpisodeCount(seasonsData.tvSeasons));
    }
  }, [seasonsData]);

  useEffect(() => {
    setPrevEpisode(getPrevEpisode(seasonsData?.tvSeasons, lastWatchedEpisode));
    setNextEpisode(getNextEpisode(seasonsData?.tvSeasons, lastWatchedEpisode));
    if (lastWatchedEpisode != null) {
      update();
    }
  }, [lastWatchedEpisode]);

  const {
    data: episodeData,
    loading: episodeLoading,
    error: episodeError,
  } = useGetEpisode(tv.code, nextEpisode?.season, nextEpisode?.episode);

  const [updateNumberOfWatchedEpisodes, { data, loading, error }] =
    useSetNumberOfWatchedEpisodes();

  function update() {
    updateNumberOfWatchedEpisodes({
      variables: {
        code: tv.code,
        seasonNumber: lastWatchedEpisode.season,
        numberOfWatchedEpisodes: lastWatchedEpisode.episode,
      },
    });
  }

  useEffect(() => {
    if (!loading && !error) {
      console.log(data?.numberOfWatchedEpisodes);
    }
  }, [data]);

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="font-medium">
              S
              {nextEpisode?.season.toLocaleString("en", {
                minimumIntegerDigits: 2,
              })}
            </div>
            <div className="">︱</div>
            <div className="font-medium">
              E
              {nextEpisode?.episode.toLocaleString("en", {
                minimumIntegerDigits: 2,
              })}
            </div>
            <div className="mx-1">•</div>
            <div className="font-medium truncate">
              {episodeData?.episode.title}
            </div>
          </div>
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
              onClick={() => {
                if (prevEpisode != null) {
                  setLastWatchedEpisode(prevEpisode);
                } else {
                  setLastWatchedEpisode({ season: 1, episode: 0 });
                }
                if (watchedEpisodeCount > 0) {
                  setWatchedEpisodeCount(watchedEpisodeCount - 1);
                }
              }}
              className="button mr-3"
            >
              <ReplyIcon className="h-5 w-5 m-1.5" />
            </button>
            <button
              onClick={() => {
                if (nextEpisode != null) {
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
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvWatching;
