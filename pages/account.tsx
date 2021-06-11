import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import MediaImage from "../components/helper/MediaImage";
import StatistikItem from "../components/helper/StatistikItem";
import styles from "../styles/Account.module.css";
import { Session } from "next-auth";
import { useEffect } from "react";
import SelectButton from "../components/helper/SelectButton";
import { useGetUser, useSetCountry, useSetLanguage } from "../hooks/DataHooks";

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

  const { data, loading, error } = useGetUser();

  return (
    <div className="flex flex-col md:px-4">
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
            <h3 className="cardHeading">Statistik</h3>
            <div className="flex flex-col">
              {isSession(session) && <h3>{session.user.name}</h3>}
              <StatistikItem title={"Watched Episodes"} times={0} />
              <StatistikItem title={"Watched Seasons"} times={0} />
              <StatistikItem title={"Watched Movies"} times={0} />
              <StatistikItem title={"Total Watchtime"} times={0 + " h"} />
              <StatistikItem title={"Average Rating"} times={0 + "," + 0} />
            </div>
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
          options={[data?.user.country]}
        />
        <label htmlFor="language" className="mr-1 ml-2">
          Language:{" "}
        </label>
        <SelectButton
          name="language"
          value={data?.user.language}
          options={[data?.user.language]}
        />
      </div>
    </div>
  );
};

export default Account;
