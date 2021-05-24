import { useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import Spinner from "../helper/Spinner";
import SeasonEpisodeList from "./SeasonEpisodeList";
import SeasonOverview from "./SeasonOverview";

type TvDetailsProps = {
  tv: Tv;
};

const TvDetails = ({ tv }: TvDetailsProps) => {
  const {
    data: tvSeasonData,
    loading: tvSeasonLoading,
    error: tvSeasonError,
  } = useGetTvSeasons(tv.code);

  return (
    <div className="cardWithShadow">
      <h3 className="cardHeading">Seasons</h3>
      {tvSeasonLoading && <Spinner className="my-4" />}
      <div className="flex flex-row flex-wrap">
        {tvSeasonData?.tvSeasons?.map((season, index) => {
          return <SeasonOverview season={season} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TvDetails;
