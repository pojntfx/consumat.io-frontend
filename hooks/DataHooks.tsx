import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
} from "../lib/api/consumat-io";

export function useMovie(code: number, country: string = "US") {
  return useGetMovieQuery({
    variables: {
      code: code,
      country: country,
    },
  });
}

export function useTv(code: number, country: string = "US") {
  return useGetTvQuery({
    variables: {
      code: code,
      country: country,
    },
  });
}

export function useSearch(keyword: string | string[]) {
  return useGetSearchQuery({
    skip: keyword == null,
    variables: {
      keyword: "" + keyword,
    },
  });
}
