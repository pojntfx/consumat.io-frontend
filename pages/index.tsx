import { usePopular } from "../hooks/DataHooks";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import MediaList from "../components/home/MediaList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Home = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  const {
    data: popularMovieData,
    loading: popularMovieLoading,
    error: popularMovieError,
  } = usePopular("movie");

  const {
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = usePopular("tv");

  return (
    <div className="md:px-4">
      <MetaData title="consumat.io | Home" />
      <MediaList
        title="MOST POPULAR MOVIES"
        items={popularMovieData?.popular}
        loading={popularMovieLoading}
        error={popularMovieError}
      />

      <MediaList
        title="MOST POPULAR TV SHOWS"
        items={popularTvData?.popular}
        loading={popularTvLoading}
        error={popularTvError}
      />
    </div>
  );
};

export default Home;
