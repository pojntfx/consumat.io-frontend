import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useGetListQuery,
} from "../lib/api/consumat-io";
import { MediaType } from "../types/media";
import { WatchStatus } from "../types/status";

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

export function usePopular(type: MediaType, country: string = "US") {
  return useGetPopularQuery({
    variables: {
      type: type,
      country: country,
    },
  });
}

export function useList(type: MediaType, watchStatus: WatchStatus) {
  return useGetListQuery({
    variables: {
      type: type,
      watchStatus: watchStatus,
    },
  });
}
