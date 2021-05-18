import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useSetWatchStatusMutation,
  useSetRatingMutation,
  useGetListQuery,
  useGetTvSeasonsQuery,
  useGetEpisodeQuery,
  useGetTvEpisodesQuery,
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

export function useGetList(type: MediaType, watchStatus: WatchStatus) {
  return useGetListQuery({
    variables: {
      type: type,
      watchStatus: watchStatus,
    },
  });
}

export function useGetTvSeasons(code: number) {
  return useGetTvSeasonsQuery({
    variables: {
      code: code,
    },
  });
}

export function useGetTvEpisodes(code: number, seasonNumber: number) {
  return useGetTvEpisodesQuery({
    variables: {
      code: code,
      seasonNumber: seasonNumber,
    },
  });
}

// Mutations

export function useSetRating(code: number, media: MediaType, rating: number) {
  return useSetRatingMutation({
    variables: {
      code: code,
      media: media,
      rating: rating,
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
