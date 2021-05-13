import { usePopular } from "../hooks/DataHooks";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import MetaData from "../components/MetaData";
import HomeHeader from "../components/home/HomeHeader";
import MediaList from "../components/home/MediaList";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useEffect, useState } from "react";
import { Media } from "../lib/api/consumat-io";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Home = () => {
  const [session] = useAuthorization();
  const [headerImageSource, setHeaderImageSource] = useState("");

  if (!session) return null;

  const {
    data: popularMovieData,
    loading: popularMovieLoading,
    error: popularMovieError,
  } = usePopular("Movie");

  const {
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = usePopular("TV");

  useEffect(() => {
    if (popularMovieData && popularTvData) {
      const movieTvArray: Media[] = [
        ...popularMovieData.popular,
        ...popularTvData.popular,
      ].filter((item) => item.backdropPath !== null);
      const randomItem =
        movieTvArray[Math.floor(Math.random() * movieTvArray.length)];
      setHeaderImageSource(randomItem?.backdropPath);
    }
  }, [popularMovieData, popularTvData]);

  return (
    <div className="md:px-4">
      <MetaData title="consumat.io | Home" />

      <HomeHeader backgroundImageSource={headerImageSource} />

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
