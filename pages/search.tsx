import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "../components/feedback/Spinner";
import ErrorMessage from "../components/feedback/ErrorMessage";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useGetSearch } from "../hooks/DataHooks";
import MediaCardList from "../components/mediaCard/MediaCardList";
import SearchBar from "../components/dataEntry/SearchBar";
import { EmojiSadIcon } from "@heroicons/react/outline";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Search = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const router = useRouter();

  // set default query if empty
  useEffect(() => {
    if (JSON.stringify(router.query) === "{}")
      router.push({ query: { q: null } }, undefined, { shallow: true });
  }, []);

  const { q } = router.query;
  const { data, loading, error } = useGetSearch(q, 1);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Search" />
      <SearchBar className="mb-3" />
      {error && <ErrorMessage />}
      {loading ? (
        <Spinner />
      ) : data != null && data.search.results.length == 0 ? (
        <div className="card flex flex-row py-2 px-4 truncate">
          <EmojiSadIcon className="h-6 w-6 mr-2 flex-shrink-0" />
          <div className="mr-2 font-medium">No results for:</div>
          <div className="italic">{`${q}`}</div>
        </div>
      ) : (
        <MediaCardList mediaList={data.search.results} />
      )}
    </div>
  );
};

export default Search;
