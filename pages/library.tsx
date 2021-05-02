import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Library = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  return (
    <div className="px-8">
      <MetaData title="consumat.io | Library" />
      <h2>Hello, Library!</h2>
    </div>
  );
};

export default Library;
