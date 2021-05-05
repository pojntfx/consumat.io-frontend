import { Media, Movie, Tv } from "../lib/api/consumat-io";

export function isMovie(media: Media): media is Movie {
  return media.__typename === "Movie";
}

export function isTv(media: Media): media is Tv {
  return media.__typename === "TV";
}
