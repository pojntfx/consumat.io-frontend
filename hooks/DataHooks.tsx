import { useGetMovieQuery } from "../lib/api/consumat-io";

export function useMovie(code: number, country: string = "US") {
  return useGetMovieQuery({
    variables: {
      code: code,
      country: country,
    },
  });
}
