import MetaData from "../components/MetaData";
import { useGetMovieQuery } from "../lib/api/consumat-io";

const Search = () => {
  const { data, loading, error } = useGetMovieQuery({
    variables: {
      code: 188927,
      country: "US",
    },
  });

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
