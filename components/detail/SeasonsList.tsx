import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSetNumberOfWatchedEpisodes } from "../../hooks/DataHooks";
import { Season } from "../../lib/api/consumat-io";
import ErrorMessage from "../feedback/ErrorMessage";
import Spinner from "../feedback/Spinner";
import SeasonOverview from "./SeasonOverview";

type SeasonsListProps = {
  seasons: Season[];
  loading: boolean;
  error: ApolloError;
};

const SeasonsList = ({ seasons, loading, error }) => {
  const [mountCounter, setMountCounter] = useState(0);
  const [allSeasons, setAllSeasons] = useState<Season[]>(seasons);
  const [
    setNumberOfWatchedEpisodes,
    {
      loading: setNumberOfWatchedEpisodesLoading,
      error: setNumberOfWatchedEpisodesError,
    },
  ] = useSetNumberOfWatchedEpisodes();

  useEffect(() => {
    setAllSeasons(seasons);
  }, [seasons]);

  useEffect(() => {
    if (mountCounter >= 2 && allSeasons) {
      allSeasons?.map((s) => {
        setNumberOfWatchedEpisodes({
          variables: {
            code: s.tvCode,
            seasonNumber: s.seasonNumber,
            numberOfWatchedEpisodes: s.numberOfWatchedEpisodes,
          },
        });
      });
    }
    setMountCounter(mountCounter + 1);
  }, [allSeasons]);

  return (
    <div
      className={`cardWithShadow ${
        setNumberOfWatchedEpisodesLoading && "animate-pulse"
      }`}
    >
      <h3 className="cardHeading">SEASONS</h3>

      {error && <ErrorMessage />}
      {loading && <Spinner className="my-4" />}

      <div className="flex flex-row flex-wrap">
        {allSeasons?.map((season, index) => {
          return (
            <SeasonOverview
              season={season}
              allSeasons={allSeasons}
              setAllSeasons={setAllSeasons}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SeasonsList;
