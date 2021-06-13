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
import SelectButton from "../components/helper/SelectButton";
import { Language } from "../types/language";
import { Country } from "../types/country";

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
  const allCountries = Country.map((item) => {
    return item.englishName;
  });
  const allLanguages = Language.map((item) => {
    return item.englishName;
  });

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
        <button className={styles.logoutButton} onClick={() => signOut()}>
          Logout
        </button>
      </div>
      <div className="flex flex-row mt-4">
        <label htmlFor="country" className="mr-1">
          Country:{" "}
        </label>
        <SelectButton
          name="country"
          value={data?.user.country}
          options={[data?.user.country, ...allCountries]}
          onChange={({ target }) =>
            updateCountry({ variables: { country: target.value } })
          }
        />
        <label htmlFor="language" className="mr-1 ml-2">
          Language:{" "}
        </label>
        <SelectButton
          name="language"
          value={data?.user.language}
          options={[data?.user.language, ...allLanguages]}
          onChange={({ target }) =>
            updateLanguage({ variables: { language: target.value } })
          }
        />
      </div>
    </div>
  );
};

export default Account;
