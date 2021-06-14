import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import {
  useGetList,
  useGetUser,
  useGetWatchCount,
  useGetWatchTime,
  useSetCountry,
  useSetLanguage,
} from "../hooks/DataHooks";
import MediaImage from "../components/helper/MediaImage";
import StatistikItem from "../components/helper/StatisticItem";
import styles from "../styles/Account.module.css";
import { Session } from "next-auth";
import { MediaType } from "../types/media";
import CustomSelectButton from "../components/helper/CustomSelectButton";
import { Language } from "../types/language";
import { Country } from "../types/country";
import { useState, useEffect } from "react";
import Spinner from "../components/helper/Spinner";
import LibraryList from "../components/library/LibraryList";
import { WatchStatus } from "../types/status";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Account = () => {
  const [session] = useAuthorization();
  if (!session) return null;
  function isSession(session: boolean | Session): session is Session {
    return true;
  }
  const [updateCountry, { data: d, loading: l, error: e }] = useSetCountry();
  const [updateLanguage, { data: de, loading: le, error: ee }] =
    useSetLanguage();
  const { data: watchTimeMovieData, loading: watchTimeMovieLoading } =
    useGetWatchTime(MediaType.Movie);
  const { data: watchTimeTVData, loading: watchTimeTVLoading } =
    useGetWatchTime(MediaType.Tv);
  const { data: watchCountMovieData, loading: watchCountMovieLoading } =
    useGetWatchCount(MediaType.Movie);
  const { data: watchCountTVData, loading: watchCountTVLoading } =
    useGetWatchCount(MediaType.Tv);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetUser();
  const {
    data: movieListData,
    loading: movieListLoading,
    error: movieListError,
  } = useGetList(MediaType.Movie, WatchStatus.Finished);
  const {
    data: tvListData,
    loading: tvListLoading,
    error: tvListError,
  } = useGetList(MediaType.Tv, WatchStatus.Finished);

  const allCountriesLabels = Country.map((item) => {
    return item.englishName;
  });
  const allCountriesIsos = Country.map((item) => {
    return item.iso;
  });
  const allLanguagesLabels = Language.map((item) => {
    return item.englishName;
  });
  const allLanguagesIsos = Language.map((item) => {
    return item.iso;
  });
  const [language, setLanguage] = useState(userData?.user.country);
  const [country, setCountry] = useState(userData?.user.language);

  return (
    <>
      {userLoading ||
      watchCountTVLoading ||
      watchCountMovieLoading ||
      watchTimeTVLoading ||
      movieListLoading ||
      tvListLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.headerRow}>
            {isSession(session) && (
              <MediaImage className="w-60 h-60" imageSrc={session.user.image} />
            )}
            <div className="flex flex-col items-center md:items-start md:mr-auto md:ml-10">
              <div
                className={
                  "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
                }
              >
                <h3 className="cardHeading">Statistics</h3>
                <div className="flex flex-col justfiy-center">
                  {isSession(session) && <h3>{session.user.name}</h3>}
                  <StatistikItem
                    title={"Watched Series"}
                    times={watchCountTVData.watchCount}
                  />
                  <StatistikItem
                    title={"Watched Movies"}
                    times={watchCountMovieData.watchCount}
                  />
                  <StatistikItem
                    title={"Total Watchtime"}
                    times={
                      (
                        watchTimeTVData.watchTime / 60 +
                        watchTimeMovieData.watchTime / 60
                      ).toFixed(0) + "h"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col" style={{ maxWidth: "10rem" }}>
              <div
                className={
                  "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
                }
              >
                <h3 className="cardHeading">Settings</h3>
                <div className="flex flex-col">
                  <label htmlFor="country" className="mr-1">
                    Country:{" "}
                  </label>
                  <CustomSelectButton
                    name="country"
                    value={country}
                    labels={allCountriesLabels}
                    options={[userData?.user.country, ...allCountriesIsos]}
                    onChange={({ target }) => {
                      setCountry(target.value);
                      updateCountry({ variables: { country: target.value } });
                    }}
                  />
                  <label htmlFor="language" className="mr-1 ml-2">
                    Language:{" "}
                  </label>
                  <CustomSelectButton
                    className="mb-2"
                    name="language"
                    value={language}
                    labels={allLanguagesLabels}
                    options={[userData?.user.language, ...allLanguagesIsos]}
                    onChange={({ target }) => {
                      setLanguage(target.value);
                      updateLanguage({ variables: { language: target.value } });
                    }}
                  />
                  <button
                    className={styles.logoutButton}
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row max-width-md mt-4">
            <div
              className={
                "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
              }
            >
              <h3 className="cardHeading">Finished Movies</h3>
              <div className="flex flex-col justfiy-center">
                <LibraryList
                  mediaList={movieListData.list}
                  watchStatus={WatchStatus.Finished}
                />
              </div>
            </div>
            <div
              className={
                "min-width- px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0 ml:0 md:ml-4"
              }
            >
              <h3 className="cardHeading">Finished Series</h3>
              <div className="flex flex-col justfiy-center">
                <LibraryList
                  mediaList={tvListData.list}
                  watchStatus={WatchStatus.Finished}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
