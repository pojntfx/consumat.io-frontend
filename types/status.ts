export enum WatchStatus {
  Watching = "Watching",
  Planning = "Planning",
  Dropped = "Dropped",
  Finished = "Finished",
}

export enum StatusMovie {
  Rumored = "Rumored",
  Planned = "Planned",
  InProduction = "In Production",
  PostProduction = "Post Production",
  Released = "Released",
  Canceled = "Canceled",
}

export enum StatusTv {
  Planned = "Planned",
  InProduction = "In Production",
  Pilot = "Pilot",
  ReturningSeries = "Returning Series",
  Canceled = "Canceled",
  Ended = "Ended",
}

export function getWatchStatusFromString(str: string): WatchStatus | null {
  switch (str) {
    case "Planning":
      return WatchStatus.Planning;
    case "Watching":
      return WatchStatus.Watching;
    case "Dropped":
      return WatchStatus.Dropped;
    case "Finished":
      return WatchStatus.Finished;
    default:
      return null;
  }
}
