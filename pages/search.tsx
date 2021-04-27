import MetaData from "../components/MetaData";
import SearchResultItem from "../components/search/SearchResultItem";
import { useMovie } from "../hooks/DataHooks";
import Spinner from "../components/helper/Spinner";

const Search = () => {
  const { data, loading, error } = useMovie(188927);

  if (error) return <h2>Error</h2>;
  if (loading) return <Spinner />;

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Search" />
      <SearchResultItem searchResult={data.movie} />
    </div>
  );
};

export default Search;
