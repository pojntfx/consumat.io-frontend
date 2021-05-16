import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useSetWatchStatusMutation,
  useSetRatingMutation,
  useGetListQuery,
} from "../lib/api/consumat-io";
import { MediaType } from "../types/media";
import { WatchStatus } from "../types/status";

// Queries

export function useGetMovie(code: number, country: string = "US") {
  return useGetMovieQuery({
    variables: {
      code: code,
      country: country,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetTv(code: number, country: string = "US") {
  return useGetTvQuery({
    variables: {
      code: code,
      country: country,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetSearch(keyword: string | string[]) {
  return useGetSearchQuery({
    skip: keyword == null,
    variables: {
      keyword: "" + keyword,
    },
  });
}

export function useGetPopular(type: MediaType, country: string = "US") {
  return useGetPopularQuery({
    variables: {
      type: type,
      country: country,
    },
  });
}

export function useSetWatchStatus(
  code: number,
  media: MediaType,
  watchStatus: WatchStatus
) {
  return useSetWatchStatusMutation({
    variables: {
      code: code,
      media: media,
      watchStatus: watchStatus,
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

export function useSetRating(code: number, media: MediaType, rating: number) {
  return useSetRatingMutation({
    variables: {
      code: code,
      media: media,
      rating: rating,
    },
  });
}
