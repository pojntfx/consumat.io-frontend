import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import MediaImage from "../components/helper/MediaImage";
import StatistikItem from "../components/helper/StatistikItem";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Account = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
      <MediaImage className="w-60 h-60" imageSrc={session.user.image} />
      <div className="flex flex-col items-center md:items-start md:mr-auto md:ml-10 ">
        <div
          className={
            "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md "
          }
        >
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
      {/* <div>{JSON.stringify(session)}</div> */}
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
