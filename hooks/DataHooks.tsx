import {
  useGetMovieQuery,
  useGetTvQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useGetListQuery,
  useGetTvSeasonsQuery,
  useGetEpisodeQuery,
  useGetSeasonEpisodesQuery,
  useGetSeasonQuery,
  useSetWatchStatusMutation,
  useSetRatingMutation,
  useSetNumberOfWatchedEpisodesMutation,
  useSetFavoriteMutation,
  useSetCountryMutation,
  useSetLanguageMutation,
  useGetUserQuery,
  useGetByRatingQuery,
} from "../lib/api/consumat-io";
import { MediaType } from "../types/media";
import { WatchStatus } from "../types/status";

// Queries

export function useGetMovie(code: number) {
  return useGetMovieQuery({
    variables: {
      code: code,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetTv(code: number) {
  return useGetTvQuery({
    variables: {
      code: code,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetSeason(code: number, seasonNumber: number) {
  return useGetSeasonQuery({
    variables: {
      code: code,
      seasonNumber: seasonNumber,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetEpisode(
  code: number,
  seasonNumber: number,
  episodeNumber: number
) {
  return useGetEpisodeQuery({
    skip: code == null || seasonNumber == null || episodeNumber == null,
    variables: {
      code: code,
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetSearch(keyword: string | string[], page: number) {
  return useGetSearchQuery({
    skip: keyword == null || keyword === "",
    variables: {
      keyword: "" + keyword,
      page: page,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetPopular(type: MediaType, page: number) {
  return useGetPopularQuery({
    variables: {
      type: type,
      page: page,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetByRating(
  type: MediaType,
  tmdbRating: number,
  minVotes: number,
  releasedFrom: string,
  page: number
) {
  return useGetByRatingQuery({
    variables: {
      type: type,
      tmdbRating: tmdbRating,
      minVotes: minVotes,
      releasedFrom: releasedFrom,
      page: page,
    },
    fetchPolicy: "cache-and-network",
  });
}

export function useGetList(
  type: MediaType,
  watchStatus: WatchStatus = null,
  favorite: boolean = null
) {
  return useGetListQuery({
    variables: {
      type: type,
      watchStatus: watchStatus,
      favorite: favorite,
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

export function useGetUser() {
  return useGetUserQuery({ fetchPolicy: "cache-and-network" });
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

export function useSetCountry() {
  return useSetCountryMutation();
}

export function useSetLanguage() {
  return useSetLanguageMutation();
}
