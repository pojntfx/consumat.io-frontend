import { useGetByRating, useGetPopular } from "../hooks/DataHooks";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import MetaData from "../components/MetaData";
import HomeHeader from "../components/home/HomeHeader";
import MediaList from "../components/home/MediaList";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useEffect, useState } from "react";
import { Media, useGetByRatingQuery } from "../lib/api/consumat-io";
import { MediaType } from "../types/media";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Home = () => {
  const [session] = useAuthorization();
  const [headerImageSource, setHeaderImageSource] = useState("");
  const [popularMoviesPage, setPopularMoviesPage] = useState(1);

  if (!session) return null;

  const {
    previousData: previousPopularMovieData,
    data: popularMovieData,
    loading: popularMovieLoading,
    error: popularMovieError,
  } = useGetPopular(MediaType.Movie, popularMoviesPage);

  const {
    previousData: previousPopularTvData,
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = useGetPopular(MediaType.Tv, 1);

  // const {
  //   data: topRatedMovieData,
  //   loading: topRatedMovieLoading,
  //   error: topRatedMovieError,
  // } = useGetByRating(
  //   MediaType.Movie,
  //   7.0,
  //   100,
  //   "2021-01-01",
  //   Math.floor(Math.random() * 5 + 1)
  // );

  useEffect(() => {
    if (popularMovieData && popularTvData && !headerImageSource) {
      const movieTvArray: Media[] = [
        ...popularMovieData.popular.results,
        ...popularTvData.popular.results,
      ].filter((item) => item.backdropPath !== null);
      const randomItem =
        movieTvArray[Math.floor(Math.random() * movieTvArray.length)];
      setHeaderImageSource(randomItem?.backdropPath);
    }
  }, [popularMovieData, popularTvData]);

  useEffect(() => {
    console.log("popularTvData changed...");
  }, [popularTvData]);

  return (
    <div className="md:px-4">
      <MetaData title="consumat.io | Home" />

      {/* When tvLoading AND movieLoading is NOT loading send headerImageSource, else: null */}
      <HomeHeader backgroundImageSource={headerImageSource} />

      <div className="cardWithShadow">
        <h2 className="cardHeading">POPULAR MOVIES</h2>
        <MediaList
          title="POPULAR MOVIES"
          items={
            popularMovieData
              ? popularMovieData.popular.results
              : previousPopularMovieData
              ? previousPopularMovieData.popular.results
              : null
          }
          loading={popularMovieLoading}
          error={popularMovieError}
        />
        <div className="flex mt-4 justify-center">
          <button
            className="button w-12 mx-1"
            onClick={() =>
              popularMoviesPage > 1 &&
              setPopularMoviesPage(popularMoviesPage - 1)
            }
          >
            -
          </button>
          <p className="font-bold mx-1">{popularMoviesPage}</p>
          <button
            className="button w-12 mx-1"
            onClick={() => setPopularMoviesPage(popularMoviesPage + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="cardWithShadow">
        <h2 className="cardHeading">POPULAR TV SHOWS</h2>
        <MediaList
          title="POPULAR TV SHOWS"
          items={popularTvData?.popular.results}
          loading={popularTvLoading}
          error={popularTvError}
        />
      </div>

      {/* <MediaList
        title="TOP-RATED MOVIES"
        items={topRatedMovieData?.byRating.results}
        loading={topRatedMovieLoading}
        error={topRatedMovieError}
      /> */}
    </div>
  );
};

export default Home;
