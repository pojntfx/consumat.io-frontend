import { useGetTvSeasons } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import Spinner from "../feedback/Spinner";
import SeasonOverview from "./SeasonOverview";
import SeasonsList from "./SeasonsList";

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
    <div>
      <SeasonsList
        seasons={tvSeasonData?.tvSeasons}
        loading={tvSeasonLoading}
        error={tvSeasonError}
      />
    </div>
  );
};

export default TvDetails;
