import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Spinner from "../components/helper/Spinner";
import LibraryList from "../components/library/LibraryList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useGetSearch } from "../hooks/DataHooks";
import { WatchStatus } from "../types/status";
import { useEffect, useState } from "react";
import ToggleSwitch from "../components/helper/ToggleSwitch";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Library = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const { data, loading, error } = useGetSearch("Star Trek");

  const [toggle, setToggle] = useState<string>(WatchStatus.Watching);

  useEffect(() => {}, [toggle]);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Library" />

      <ToggleSwitch
        name="watchStatus"
        value={toggle}
        onChange={setToggle}
        options={[
          WatchStatus.Watching,
          WatchStatus.Planning,
          WatchStatus.Dropped,
          WatchStatus.Finished,
        ]}
      />

      {loading ? (
        <Spinner />
      ) : (
        data != null && (
          <LibraryList mediaList={data.search} watchStatus={null} />
        )
      )}
    </div>
  );
};

export default Library;
