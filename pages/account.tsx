import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import {
  useGetUser,
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
import { useState } from "react";

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
  const { data: watchTimeData, loading: watchTimeLoading } = useGetWatchTime(
    MediaType.Movie
  );
  const { data, loading, error } = useGetUser();

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
  const [language, setLanguage] = useState(data?.user.country);
  const [country, setCountry] = useState(data?.user.language);

  return (
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
          <div className="flex flex-col">
            {isSession(session) && <h3>{session.user.name}</h3>}
            <StatistikItem title={"Watched Episodes"} times={0} />
            <StatistikItem title={"Watched Movies"} times={0} />
            <StatistikItem
              title={"Total Watchtime"}
              times={watchTimeLoading ? "0 h" : watchTimeData.watchTime + " h"}
            />
            <StatistikItem title={"Average Rating"} times={0 + "," + 0} />
          </div>
        </div>
      </div>
      <div className="flex flex-col" style={{ maxWidth: "8rem" }}>
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
              options={[data?.user.country, ...allCountriesIsos]}
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
              options={[data?.user.language, ...allLanguagesIsos]}
              onChange={({ target }) => {
                setLanguage(target.value);
                updateLanguage({ variables: { language: target.value } });
              }}
            />
            <button className={styles.logoutButton} onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
