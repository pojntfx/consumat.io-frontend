import { Season } from "../lib/api/consumat-io";

export type EpisodeNumber = {
  season: number;
  episode: number;
};

export function getLastWatchedEpisode(seasons: Season[]): EpisodeNumber {
  let seasonCount = 0;
  for (const season of seasons) {
    if (season.numberOfWatchedEpisodes == season.numberOfEpisodes) {
      seasonCount++;
    } else {
      break;
    }
  }
  if (seasonCount == 0) {
    return {
      season: 1,
      episode: 0,
    };
  } else if (
    seasonCount == seasons.length ||
    seasons[seasonCount].numberOfWatchedEpisodes == null ||
    seasons[seasonCount].numberOfWatchedEpisodes == 0
  ) {
    return {
      season: seasonCount,
      episode: seasons[seasonCount - 1].numberOfWatchedEpisodes,
    };
  } else {
    return {
      season: seasonCount,
      episode: seasons[seasonCount].numberOfWatchedEpisodes,
    };
  }
}

export function getPrevEpisode(
  seasons: Season[],
  episodeNumber: EpisodeNumber
): EpisodeNumber {
  if (seasons == null || episodeNumber == null) return null;
  if (episodeNumber.episode > 1) {
    return {
      season: episodeNumber.season,
      episode: episodeNumber.episode - 1,
    };
  } else if (episodeNumber.season > 1) {
    return {
      season: episodeNumber.season - 1,
      episode: seasons[episodeNumber.season - 1].numberOfEpisodes,
    };
  } else {
    return null;
  }
}

export function getNextEpisode(
  seasons: Season[],
  episodeNumber: EpisodeNumber
): EpisodeNumber {
  if (seasons == null || episodeNumber == null) return null;
  if (
    episodeNumber.episode < seasons[episodeNumber.season - 1].numberOfEpisodes
  ) {
    return {
      season: episodeNumber.season,
      episode: episodeNumber.episode + 1,
    };
  } else if (episodeNumber.season < seasons.length) {
    return {
      season: episodeNumber.season + 1,
      episode: 1,
    };
  } else {
    return null;
  }
}

export function getWatchedEpisodeCount(seasons: Season[]): number {
  let count = 0;
  seasons.forEach((season) => {
    count += season.numberOfWatchedEpisodes;
  });
  return count;
}
