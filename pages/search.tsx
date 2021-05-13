import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../components/helper/Spinner";
import ErrorMessage from "../components/helper/ErrorMessage";
import MetaData from "../components/MetaData";
import SearchResultList from "../components/search/SearchResultList";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useSearch } from "../hooks/DataHooks";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Search = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState<string>("");
  const { data, loading, error } = useSearch(q);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Search" />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push({ query: { q: query } });
        }}
        autoComplete="off"
        className="flex flex-col lg:flex-row mb-2"
      >
        <div className="flex mb-2 w-full lg:w-1/2 lg:mr-2 lg:flex-grow">
          <input
            type="search"
            name="q"
            placeholder="Search..."
            aria-label="Search"
            required
            onChange={(event) => setQuery(event.target.value)}
            className="p-2 rounded-l w-full mr-0.5"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r dark:text-gray-800"
          >
            Search
          </button>
        </div>
        <select
          name="genre"
          id="genre"
          className="px-1 h-10 rounded cursor-pointer mb-2 lg:mx-2 dark:text-gray-800"
        >
          <option value="">Genre</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
        </select>
      </form>

      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        data != null && <SearchResultList mediaList={data.search} />
      )}
    </div>
  );
};

export default Search;
