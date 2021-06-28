import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetSeasonEpisodes } from "../../hooks/DataHooks";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Season } from "../../lib/api/consumat-io";
import MediaImage from "../dataDisplay/MediaImage";
import Spinner from "../feedback/Spinner";

type SeasonEpisodeListProps = {
  season: Season;
  allSeasons: Season[];
  setAllSeasons: Dispatch<SetStateAction<Season[]>>;
};

const SeasonEpisodeList = ({
  season,
  allSeasons,
  setAllSeasons,
}: SeasonEpisodeListProps) => {
  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetSeasonEpisodes(season.tvCode, season.seasonNumber);

  return (
    <ul className="episodeList">
      {episodesLoading && !episodesData && <Spinner className="my-8" />}
      {episodesData?.seasonEpisodes?.map((episode, index) => {
        return (
          <li key={index}>
            <button
              className={`flex items-center w-full h-20 rounded overflow-hidden my-1 ${
                season.numberOfWatchedEpisodes >= episode.episodeNumber
                  ? `bg-green-500 text-white`
                  : "ring-1 ring-inset ring-gray-200"
              }`}
              onClick={() => {
                // Handle selected watched episode
                if (episode.episodeNumber > season.numberOfWatchedEpisodes) {
                  // Set all episodes of seasons previous to the selected episode's season to watched
                  const updatedSeasons: Season[] = [
                    ...allSeasons
                      .filter((s) => s.seasonNumber < season.seasonNumber)
                      .map((s) => {
                        const updatedSeason: Season = {
                          ...s,
                          numberOfWatchedEpisodes: s.numberOfEpisodes,
                        };
                        return updatedSeason;
                      }),
                    ...allSeasons
                      .filter((s) => s.seasonNumber == season.seasonNumber)
                      .map((s) => {
                        const updatedSeason: Season = {
                          ...s,
                          numberOfWatchedEpisodes: episode.episodeNumber,
                        };
                        return updatedSeason;
                      }),
                    ...allSeasons.filter(
                      (s) => s.seasonNumber > season.seasonNumber
                    ),
                  ];
                  setAllSeasons(updatedSeasons);
                } else if (
                  episode.episodeNumber <= season.numberOfWatchedEpisodes
                ) {
                  const updatedSeasons: Season[] = [
                    ...allSeasons.filter(
                      (s) => s.seasonNumber < season.seasonNumber
                    ),
                    ...allSeasons
                      .filter((s) => s.seasonNumber == season.seasonNumber)
                      .map((s) => {
                        const updatedSeason: Season = {
                          ...s,
                          numberOfWatchedEpisodes: episode.episodeNumber - 1,
                        };
                        return updatedSeason;
                      }),
                    ...allSeasons
                      .filter((s) => s.seasonNumber > season.seasonNumber)
                      .map((s) => {
                        const updatedSeason: Season = {
                          ...s,
                          numberOfWatchedEpisodes: 0,
                        };
                        return updatedSeason;
                      }),
                  ];

                  setAllSeasons(updatedSeasons);
                }
              }}
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
