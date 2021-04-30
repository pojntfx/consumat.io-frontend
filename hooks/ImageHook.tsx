enum backdrop {
  w0300 = "w300",
  w0780 = "w780",
  w1280 = "w1280",
  original = "original",
}
enum logo {
  w045 = "w45",
  w092 = "w92",
  w154 = "w154",
  w185 = "w185",
  w300 = "w300",
  w500 = "w500",
  original = "original",
}
enum poster {
  w092 = "w92",
  w154 = "w154",
  w185 = "w185",
  w342 = "w342",
  w500 = "w500",
  w780 = "w780",
  original = "original",
}
enum profile {
  w045 = "w45",
  w185 = "w185",
  h632 = "h632",
  original = "original",
}
enum still {
  w092 = "w92",
  w185 = "w185",
  w300 = "w300",
  original = "original",
}

export const imageSizes = {
  backdrop: backdrop,
  logo: logo,
  poster: poster,
  profile: profile,
  still: still,
};

const baseUrl = "https://image.tmdb.org/t/p/";

export function useImage(
  imageSize: backdrop | logo | poster | profile | still,
  imagePath: string
): string {
  return baseUrl + imageSize + imagePath;
}
