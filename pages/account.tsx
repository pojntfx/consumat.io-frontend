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
    <div className="flex flex-row items-start justify-between">
      <MediaImage className="w-40 h-60" imageSrc={session.user.image} />
      <div className="mr-auto ml-10">
        <p>{session.user.name}</p>
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
