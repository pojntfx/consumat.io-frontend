import MetaData from "../components/MetaData";
import { useSearch } from "../hooks/DataHooks";
import Spinner from "../components/helper/Spinner";
import SearchResultList from "../components/search/SearchResultList";
import { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
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
        <div className="flex mb-2 w-full lg:w-1/2 lg:mr-2">
          <input
            type="search"
            name="q"
            placeholder="Search..."
            aria-label="Search"
            required
            onChange={(event) => setQuery(event.target.value)}
            className="p-2 rounded-l w-full duration-75"
          />
          <button
            className="px-4 py-2 rounded-r border-solid border-l-2 border-gray-200 duration-75"
            type="submit"
          >
            Search
          </button>
        </div>
        <select
          name="genre"
          id="genre"
          className="p-2 h-10 border-2 rounded border-transparent duration-75 cursor-pointer mb-2 lg:mx-2"
        >
          <option value="">Genre</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
        </select>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        data != null && <SearchResultList searchResults={data.search} />
      )}
    </div>
  );
};

export default Search;
