import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useSetWatchStatusMutation,
  useSetRatingMutation,
} from "../lib/api/consumat-io";
import { mediaType } from "../types/mediaType";
import { watchStatus } from "../types/status";

// Queries

export function useGetMovie(code: number, country: string = "US") {
  return useGetMovieQuery({
    variables: {
      code: code,
      country: country,
    },
  });
}

export function useGetTv(code: number, country: string = "US") {
  return useGetTvQuery({
    variables: {
      code: code,
      country: country,
    },
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

export function useGetPopular(type: mediaType, country: string = "US") {
  return useGetPopularQuery({
    variables: {
      type: type,
      country: country,
    },
  });
}

// Mutations

export function useSetWatchStatus(
  code: number,
  media: mediaType,
  watchStatus: watchStatus
) {
  return useSetWatchStatusMutation({
    variables: {
      code: code,
      media: media,
      watchStatus: watchStatus,
    },
  });
}

export function useSetRating(code: number, media: mediaType, rating: number) {
  return useSetRatingMutation({
    variables: {
      code: code,
      media: media,
      rating: rating,
    },
  });
}
