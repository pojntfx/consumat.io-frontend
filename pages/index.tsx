import MetaData from "../components/MetaData";
import MediaList from "../components/MediaList";
import { useSearch } from "../hooks/DataHooks";

const Home = () => {
  const {
    data: popularMovieData,
    loading: popularMovieLoading,
    error: popularMovieError,
  } = useSearch("Star Wars");

  const {
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = useSearch("Popular");

  return (
    <div className="md:px-4">
      <MetaData title="consumat.io | Home" />
      <MediaList
        title="MOST POPULAR MOVIES"
        items={popularMovieData}
        loading={popularMovieLoading}
        error={popularMovieError}
      />

      <MediaList
        title="MOST POPULAR TV SHOWS"
        items={popularTvData}
        loading={popularTvLoading}
        error={popularTvError}
      />
    </div>
  );
};

export default Home;
