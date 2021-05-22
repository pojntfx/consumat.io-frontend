import { GetServerSideProps } from "next";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Discover = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  return (
    <div className="px-8">
      <MetaData title="consumat.io | Discover" />
      <h2 className="mb-10">Hello, Discover!</h2>
      <button className="button px-4 py-1">Button</button>
    </div>
  );
};

export default Discover;
