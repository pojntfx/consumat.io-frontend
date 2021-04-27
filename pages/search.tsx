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
      >
        <input
          type="search"
          name="q"
          placeholder="Search..."
          aria-label="Search"
          required
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <Spinner />
      ) : data != null ? (
        <SearchResultList searchResults={data.search} />
      ) : null}
    </div>
  );
};

export default Search;
