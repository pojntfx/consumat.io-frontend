import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useGetListQuery,
  useGetTvSeasonsQuery,
  useGetEpisodeQuery,
  useGetSeasonEpisodesQuery,
  useSetWatchStatusMutation,
  useSetRatingMutation,
  useSetNumberOfWatchedEpisodesMutation,
  useSetFavoriteMutation,
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

export function useGetSearch(keyword: string | string[], page: number) {
  return useGetSearchQuery({
    skip: keyword == null,
    variables: {
      keyword: "" + keyword,
      page: page,
    },
  });
}

export function useGetPopular(
  type: MediaType,
  page: number,
  country: string = "US"
) {
  return useGetPopularQuery({
    variables: {
      type: type,
      country: country,
      page: page,
    },
  });
}

export function useGetList(type: MediaType, watchStatus: WatchStatus) {
  return useGetListQuery({
    variables: {
      type: type,
      watchStatus: watchStatus,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetTvSeasons(code: number) {
  return useGetTvSeasonsQuery({
    variables: {
      code: code,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetSeasonEpisodes(code: number, seasonNumber: number) {
  return useGetSeasonEpisodesQuery({
    variables: {
      code: code,
      seasonNumber: seasonNumber,
    },
    fetchPolicy: "cache-and-network",
  });
}

// Mutations

export function useSetRating() {
  return useSetRatingMutation();
}

export function useSetWatchStatus() {
  return useSetWatchStatusMutation();
}

export function useSetNumberOfWatchedEpisodes() {
  return useSetNumberOfWatchedEpisodesMutation();
}

export function useSetFavorite() {
  return useSetFavoriteMutation();
}
