import { CheckIcon, ReplyIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  useGetSeasonEpisodes,
  useGetTvSeasons,
  useSetNumberOfWatchedEpisodes,
} from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import Progressbar from "../helper/Progressbar";

type ContentTvWatchingProps = {
  tv: Tv;
};

function ContentTvWatching({ tv }: ContentTvWatchingProps) {
  const {
    data: seasonsData,
    loading: seasonsLoading,
    error: seasonsError,
  } = useGetTvSeasons(tv.code);
  const [currentSeason, setCurrentSeason] = useState<number>(1);
  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetSeasonEpisodes(tv.code, currentSeason);
  const [lastEpisode, setLastEpisode] = useState<number>(0);

  const [updateNumberOfWatchedEpisodes, { loading, error }] =
    useSetNumberOfWatchedEpisodes();

  useEffect(() => {
    /*
    updateNumberOfWatchedEpisodes({
      variables: {
        code: tv.code,
        seasonNumber: currentSeason,
        numberOfWatchedEpisodes: lastEpisode,
      },
    });
    */
  }, [lastEpisode]);

  return (
    <div className="flex flex-col mx-2 h-23">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="font-medium">
            S
            {currentSeason.toLocaleString("en", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <div className="">︱</div>
          <div className="font-medium">
            E
            {(lastEpisode + 1).toLocaleString("en", {
              minimumIntegerDigits: 2,
            })}
          </div>
          <div className="mx-1">•</div>
          <div className="font-medium">
            {episodesData?.seasonEpisodes[lastEpisode].title}
          </div>
        </div>
        <div className="flex flex-row">
          <Progressbar
            progress={lastEpisode}
            limit={tv.numberOfEpisodes}
            className="mt-1"
          />
          <div className="text-sm font-medium text-gray-500 ml-2">
            {lastEpisode}/{tv.numberOfEpisodes}
          </div>
        </div>
        <div className="flex flex-row items-center py-2 mb-1">
          <button
            onClick={() => {
              setLastEpisode(lastEpisode - 1);
            }}
            className="button mr-3"
          >
            <ReplyIcon className="h-5 w-5 m-1" />
          </button>
          <button
            onClick={() => {
              setLastEpisode(lastEpisode + 1);
            }}
            className="button text-sm font-semibold w-max py-1 px-2 flex flex-row"
          >
            <CheckIcon className="h-5 w-5 mr-1" />
            Episode Watched
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentTvWatching;
