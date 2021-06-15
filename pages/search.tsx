import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import Spinner from "../components/feedback/Spinner";
import ErrorMessage from "../components/feedback/ErrorMessage";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useGetSearch } from "../hooks/DataHooks";
import MediaCardList from "../components/mediaCard/MediaCardList";
import SearchBar from "../components/dataEntry/SearchBar";

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
      ) : (
        data != null && <MediaCardList mediaList={data.search.results} />
      )}
    </div>
  );
};

export default Search;
