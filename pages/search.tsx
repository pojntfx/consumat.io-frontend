import MetaData from "../components/MetaData";
import { useMovie } from "../hooks/DataHooks";

const Search = () => {
  const { data, loading, error } = useMovie(188927);

  if (error) return <h2>Error</h2>;
  if (loading) return <h2>Loading ...</h2>;

  return (
    <div className="px-8">
      <MetaData title="consumat.io | Search" />
      <h2>{JSON.stringify(data.movie.title)}</h2>
    </div>
  );
};

export default Search;
