import { useEffect, useState } from "react";
import {
  useGetSeasonEpisodes,
  useSetNumberOfWatchedEpisodes,
} from "../../hooks/DataHooks";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import MediaImage from "../helper/MediaImage";
import Spinner from "../helper/Spinner";

type SeasonEpisodeListProps = {
  tvCode: number;
  seasonNumber: number;
  numberOfEpisodesWatched: number;
  numberOfEpisodes: number;
};

const SeasonEpisodeList = ({
  tvCode,
  seasonNumber,
  numberOfEpisodesWatched,
  numberOfEpisodes,
}: SeasonEpisodeListProps) => {
  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetSeasonEpisodes(tvCode, seasonNumber);

  const [
    setNumberOfWatchedEpisodes,
    {
      loading: setNumberOfWatchedEpisodesLoading,
      error: setNumberOfWatchedEpisodesError,
    },
  ] = useSetNumberOfWatchedEpisodes();

  const [currentNumberEpisodesWatched, setCurrentNumberEpisodesWatched] =
    useState(numberOfEpisodesWatched);

  // const showEpisodesToBeSelected = (button: HTMLButtonElement) => {
  //   button.classList.add("bg-green-500", "text-white");
  // };

  useEffect(() => {
    console.log(
      `Setting number of watched episodes, loading: ${setNumberOfWatchedEpisodesLoading}, error: ${setNumberOfWatchedEpisodesError}`
    );
  }, [setNumberOfWatchedEpisodesLoading, setNumberOfWatchedEpisodesError]);

  return (
    <ul className="episodeList">
      {episodesLoading && !episodesData && <Spinner className="my-8" />}
      {episodesData?.seasonEpisodes?.map((episode, index) => {
        console.log(tvCode);

        return (
          <li key={index}>
            <button
              className={`flex items-center w-full h-20 rounded overflow-hidden my-1 ${
                currentNumberEpisodesWatched >= episode.episodeNumber
                  ? `bg-green-500 text-white ${
                      setNumberOfWatchedEpisodesLoading && "animate-pulse"
                    }`
                  : "ring-1 ring-inset ring-gray-200"
              }`}
              onClick={() => {
                console.log(
                  `Setting number of watched episodes of ${tvCode}, season ${episode.seasonNumber} to ${episode.episodeNumber}.`
                );
                setNumberOfWatchedEpisodes({
                  variables: {
                    code: tvCode,
                    seasonNumber: episode.seasonNumber,
                    numberOfWatchedEpisodes: episode.episodeNumber,
                  },
                });
                setCurrentNumberEpisodesWatched(episode.episodeNumber);
              }}
              // onMouseOver={(event) =>
              //   showEpisodesToBeSelected(event.currentTarget)
              // }
            >
              <MediaImage
                imageSrc={useImage(imageSizes.still.w185, episode.stillPath)}
                className="w-1/5 h-full filter brightness-75"
              />
              <div className="flex flex-col justify-center h-full w-4/5 max-w-full text-left p-1 ml-1">
                <p className="font-semibold truncate">
                  {episode.episodeNumber}. {episode.title}
                </p>
                <p className="text-sm max-w-full line-clamp-2">
                  {episode.overview}
                </p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SeasonEpisodeList;
