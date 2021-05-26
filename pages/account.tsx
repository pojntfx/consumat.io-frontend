import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import MediaImage from "../components/helper/MediaImage";
import StatistikItem from "../components/helper/StatistikItem";
import styles from "../styles/Account.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Account = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  return (
    <div className={styles.headerRow}>
      <MediaImage className="w-60 h-60" imageSrc={session.user.image} />
      <div className="flex flex-col items-center md:items-start md:mr-auto md:ml-10">
        <div className={styles.cardBackground}>
          <h3 className="cardHeading">Statistik</h3>
          <div className="flex flex-col">
            <h3>{session.user.name}</h3>
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
  );
};

export default Account;
