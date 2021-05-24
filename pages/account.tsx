import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import { useAuthorization } from "../hooks/AuthnHooks";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Account = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  return (
    <div>
      <button
        className="px-4 py-2 rounded-r border-solid border-l-2 border-gray-200 duration-75"
        onClick={() => signOut()}
      >
        Logout
      </button>

      <div>{JSON.stringify(session)}</div>
    </div>
  );
};

export default Account;
