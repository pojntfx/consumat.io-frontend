import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Spinner from "../components/helper/Spinner";
import LibraryList from "../components/library/LibraryList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useSearch } from "../hooks/DataHooks";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Library = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const { data, loading, error } = useSearch("Star Trek");

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Library" />

      {loading ? (
        <Spinner />
      ) : (
        data != null && <LibraryList mediaList={data.search} />
      )}
    </div>
  );
};

export default Library;
