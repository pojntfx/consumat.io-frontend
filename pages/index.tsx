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
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import PaginationBar from "../components/dataEntry/PaginationBar";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Home = () => {
  const [session] = useAuthorization();
  const [headerImageSource, setHeaderImageSource] = useState("");
  const [popularMoviesPage, setPopularMoviesPage] = useState(1);
  const [popularTvPage, setPopularTvPage] = useState(1);
  const [topRatedMoviesPage, setTopRatedMoviesPage] = useState(1);
  const [topRatedTvPage, setTopRatedTvPage] = useState(1);

  if (!session) return null;

  const {
    previousData: previousPopularMoviesData,
    data: popularMoviesData,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useGetPopular(MediaType.Movie, popularMoviesPage);

  const {
    previousData: previousPopularTvData,
    data: popularTvData,
    loading: popularTvLoading,
    error: popularTvError,
  } = useGetPopular(MediaType.Tv, popularTvPage);

  const {
    previousData: previousTopRatedMoviesData,
    data: topRatedMoviesData,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useGetByRating(
    MediaType.Movie,
    7.0,
    25,
    new Date(new Date().getFullYear(), 0, 1).toISOString(),
    topRatedMoviesPage
  );

  const {
    previousData: previousTopRatedTvData,
    data: topRatedTvData,
    loading: topRatedTvLoading,
    error: topRatedTvError,
  } = useGetByRating(
    MediaType.Tv,
    7.0,
    25,
    new Date(new Date().getFullYear(), 0, 1).toISOString(),
    topRatedTvPage
  );

  useEffect(() => {
    if (popularMoviesData && popularTvData && !headerImageSource) {
      const movieTvArray: Media[] = [
        ...popularMoviesData.popular.results,
        ...popularTvData.popular.results,
      ].filter((item) => item.backdropPath !== null);
      const randomItem =
        movieTvArray[Math.floor(Math.random() * movieTvArray.length)];
      setHeaderImageSource(randomItem?.backdropPath);
    }
  }, [popularMoviesData, popularTvData]);

  return (
    <div className="md:px-4">
      <MetaData title="consumat.io | Home" />

      <HomeHeader backgroundImageSource={headerImageSource} />

      <MediaList
        title="POPULAR MOVIES"
        mediaPage={popularMoviesData?.popular}
        previouslyLoadedMediaPage={previousPopularMoviesData?.popular}
        pageNumber={popularMoviesPage}
        setPage={setPopularMoviesPage}
        loading={popularMoviesLoading}
        error={popularMoviesError}
      />

      <MediaList
        title="POPULAR TV SHOWS"
        mediaPage={popularTvData?.popular}
        previouslyLoadedMediaPage={previousPopularTvData?.popular}
        pageNumber={popularTvPage}
        setPage={setPopularTvPage}
        loading={popularTvLoading}
        error={popularTvError}
      />

      <MediaList
        title={`TOP RATED MOVIES ${new Date().getFullYear().toString()}`}
        mediaPage={topRatedMoviesData?.byRating}
        previouslyLoadedMediaPage={previousTopRatedMoviesData?.byRating}
        pageNumber={topRatedMoviesPage}
        setPage={setTopRatedMoviesPage}
        loading={topRatedMoviesLoading}
        error={topRatedMoviesError}
      />

      <MediaList
        title={`TOP RATED SHOWS ${new Date().getFullYear().toString()}`}
        mediaPage={topRatedTvData?.byRating}
        previouslyLoadedMediaPage={previousTopRatedTvData?.byRating}
        pageNumber={topRatedTvPage}
        setPage={setTopRatedTvPage}
        loading={topRatedTvLoading}
        error={topRatedTvError}
      />
    </div>
  );
};

export default Home;
