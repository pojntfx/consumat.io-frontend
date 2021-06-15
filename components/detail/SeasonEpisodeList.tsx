import { useEffect, useState } from "react";
import {
  useGetSeasonEpisodes,
  useSetNumberOfWatchedEpisodes,
} from "../../hooks/DataHooks";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Season } from "../../lib/api/consumat-io";
import MediaImage from "../dataDisplay/MediaImage";
import Spinner from "../feedback/Spinner";

type SeasonEpisodeListProps = {
  season: Season;
  allSeasons: Season[];
};

const SeasonEpisodeList = ({ season, allSeasons }: SeasonEpisodeListProps) => {
  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetSeasonEpisodes(season.tvCode, season.seasonNumber);

  const [
    setNumberOfWatchedEpisodes,
    {
      loading: setNumberOfWatchedEpisodesLoading,
      error: setNumberOfWatchedEpisodesError,
    },
  ] = useSetNumberOfWatchedEpisodes();

  const [currentNumberEpisodesWatched, setCurrentNumberEpisodesWatched] =
    useState(
      season.numberOfWatchedEpisodes == null
        ? 0
        : season.numberOfWatchedEpisodes
    );

  // const showEpisodesToBeSelected = (button: HTMLButtonElement) => {
  //   button.classList.add("bg-green-500", "text-white");
  // };

  return (
    <ul className="episodeList">
      {episodesLoading && !episodesData && <Spinner className="my-8" />}
      {episodesData?.seasonEpisodes?.map((episode, index) => {
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
                  `Clicked index: ${index} and episode number: ${
                    episode.episodeNumber
                  }, number of watched episodes: ${
                    season.numberOfWatchedEpisodes == null
                      ? 0
                      : season.numberOfWatchedEpisodes
                  }`
                );

                // TODO: Make episode 1 unwatched,
                // set all previous episodes to watched across seasons and
                // display it without reloading the page
                allSeasons
                  .filter((s) => s.seasonNumber < season.seasonNumber)
                  .forEach((s) => {
                    console.log("Hello there!");

                    console.log(
                      `S${s.seasonNumber}, setting ${s.numberOfEpisodes} episodes to watched!`
                    );
                    setNumberOfWatchedEpisodes({
                      variables: {
                        code: s.tvCode,
                        seasonNumber: s.seasonNumber,
                        numberOfWatchedEpisodes: s.numberOfEpisodes,
                      },
                    });
                  });

                setNumberOfWatchedEpisodes({
                  variables: {
                    code: season.tvCode,
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
