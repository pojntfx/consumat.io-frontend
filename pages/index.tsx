import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import MediaList, { Medium, MediumType } from "../components/MediaList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useMovie, useTv } from "../hooks/DataHooks";

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
  } = useMovie(188927);
  const [popularMovieItems, setPopularMovieItems] = useState(
    new Array<Medium>()
  );

  const {
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = useTv(87917);
  const [popularTvItems, setPopularTvItems] = useState(new Array<Medium>());

  useEffect(() => {
    if (!popularMovieLoading && popularMovieData) {
      const movieItem = {
        code: popularMovieData.movie.code,
        title: popularMovieData.movie.title,
        poster: popularMovieData.movie.posterPath,
        type: MediumType.Movie,
      };

      setPopularMovieItems([
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
        movieItem,
      ]);
    }
  }, [popularMovieData, popularMovieLoading, popularMovieError]);

  useEffect(() => {
    if (!popularTvLoading && popularTvData) {
      const tvItem = {
        code: popularTvData.tv.code,
        title: popularTvData.tv.title,
        poster: popularTvData.tv.posterPath,
        type: MediumType.TV,
      };

      setPopularTvItems([
        tvItem,
        tvItem,
        tvItem,
        tvItem,
        tvItem,
        tvItem,
        tvItem,
        tvItem,
      ]);
    }
  }, [popularTvData, popularTvLoading, popularTvError]);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Home" />
      <MediaList
        title="MOST POPULAR MOVIES"
        items={popularMovieItems}
        loading={popularMovieLoading}
        error={popularMovieError}
      />

      <MediaList
        title="MOST POPULAR TV SHOWS"
        items={popularTvItems}
        loading={popularTvLoading}
        error={popularTvError}
      />
    </div>
  );
};

export default Home;
