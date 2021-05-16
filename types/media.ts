import { Media, Movie, Tv } from "../lib/api/consumat-io";

export enum MediaType {
  Movie = "Movie",
  Tv = "TV",
}

export function isMovie(media: Media): media is Movie {
  return media.__typename === MediaType.Movie;
}

export function isTv(media: Media): media is Tv {
  return media.__typename === MediaType.Tv;
}

export function isMovieList(mediaList: Media[]): mediaList is Movie[] {
  mediaList.forEach((media) => {
    if (media.__typename !== MediaType.Movie) return false;
  });
  return true;
}

export function isTvList(mediaList: Media[]): mediaList is Tv[] {
  mediaList.forEach((media) => {
    if (media.__typename !== MediaType.Tv) return false;
  });
  return true;
}
