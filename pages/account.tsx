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
import MediaImage from "../components/dataDisplay/MediaImage";
import styles from "../styles/Account.module.css";
import { Session } from "next-auth";
import { MediaType } from "../types/media";
import CustomSelectButton from "../components/dataEntry/CustomSelectButton";
import { Language } from "../types/language";
import { Country } from "../types/country";
import { useState } from "react";
import Spinner from "../components/feedback/Spinner";
import { WatchStatus } from "../types/status";
import MediaCardList from "../components/mediaCard/MediaCardList";
import LoadingDots from "../components/feedback/LoadingDots";

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
      {userLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.headerRow}>
            <div className="w-full md:w-max flex flex-col md:flex-row justfiy-start items-center md:items-start md:mr-4">
              <div
                className={
                  "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
                }
              >
                <h3 className="cardHeading">UserInfo</h3>
                <div className="flex flex-col md:flex-row">
                  {isSession(session) && (
                    <MediaImage
                      className="w-86 md:w-60 md:h-60 mb-4 md:mb-0"
                      imageSrc={session.user.image}
                    />
                  )}
                  <div
                    className="ml-0 md:ml-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded"
                    style={{ width: 2 }}
                  />
                  <div className="md:h-60 flex flex-col justfiy-center ml-0 md:ml-4">
                    {isSession(session) && <h3>{session.user.name}</h3>}

                    <div className="flex flex-row items-center">
                      <h3 className="mr-2">Watched Series</h3>{" "}
                      {watchCountTVLoading ? (
                        <LoadingDots />
                      ) : (
                        <p className="ml-auto">{watchCountTVData.watchCount}</p>
                      )}
                    </div>

                    <div className="flex flex-row items-center">
                      <h3 className="mr-2">Watched Movies</h3>{" "}
                      {watchCountMovieLoading ? (
                        <LoadingDots />
                      ) : (
                        <p className="ml-auto">
                          {watchCountMovieData.watchCount}
                        </p>
                      )}
                    </div>

                    {/* <StatistikItem
                      title={"Watched Movies"}
                      times={watchCountMovieData.watchCount}
                      loading={watchCountMovieLoading}
                    />
                    <StatistikItem
                      title={"Total Watchtime"}
                      times={
                        (
                          watchTimeTVData.watchTime / 60 +
                          watchTimeMovieData.watchTime / 60
                        ).toFixed(0) + "h"
                      }
                      loading={watchTimeTVLoading}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className={
                  "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
                }
              >
                <h3 className="cardHeading">Settings</h3>
                <div className="flex flex-col md:h-60 justify-start">
                  <label htmlFor="country" className="mr-1">
                    Country:{" "}
                  </label>
                  <CustomSelectButton
                    name="country"
                    value={userData?.user.country}
                    labels={allCountriesLabels}
                    options={allCountriesIsos}
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
                    value={userData?.user.language}
                    labels={allLanguagesLabels}
                    options={allLanguagesIsos}
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
          <div className="px-4 md:px-0 flex flex-col md:flex-row max-width-md mt-4">
            <div
              className={
                "w-full md:w-12/25 px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0"
              }
            >
              <h3 className="cardHeading">Finished Movies</h3>
              <div className="flex flex-col justfiy-center">
                {movieListLoading ? (
                  <Spinner />
                ) : (
                  <MediaCardList
                    mediaList={movieListData.list}
                    watchStatus={WatchStatus.Finished}
                  />
                )}
              </div>
            </div>
            <div
              className={
                "w-full md:w-12/25 px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md mt-4 md:mt-0 ml:0 md:ml-auto"
              }
            >
              <h3 className="cardHeading">Finished Series</h3>
              <div className="flex flex-col justfiy-center">
                {tvListLoading ? (
                  <Spinner />
                ) : (
                  <MediaCardList
                    mediaList={tvListData.list}
                    watchStatus={WatchStatus.Finished}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
