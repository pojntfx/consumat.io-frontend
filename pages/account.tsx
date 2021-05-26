import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";
import MediaImage from "../components/helper/MediaImage";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Account = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
      <MediaImage className="w-40 h-60" imageSrc={session.user.image} />
      <div className="flex flex-col items-center md:items-start md:mr-auto md:ml-10 ">
        <div
          className={
            "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md "
          }
        >
          <h3 className="cardHeading">Statistik</h3>
          <div className="flex flex-col">
            <p>{session.user.name}</p>

            <div className="flex flex-row">
              <p>Watched Episodes</p> <p className="ml-2">XX</p>
            </div>
            <div className="flex flex-row">
              <p>Watched Seasons</p> <p className="ml-2">XX</p>
            </div>
            <div className="flex flex-row">
              <p>Watched Movies</p> <p className="ml-2">XX</p>
            </div>
            <div className="flex flex-row">
              <p>Total Watchtime</p> <p className="ml-2">Xh</p>
            </div>
            <div className="flex flex-row">
              <p>Average Rating</p> <p className="ml-2">X,X</p>
            </div>
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
