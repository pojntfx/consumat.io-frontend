import { ClockIcon } from "@heroicons/react/outline";
import React from "react";
import { Episode } from "../../lib/api/consumat-io";
import {
  daysUntilDate,
  isDateInFuture,
  isDateInPast,
  isDateInPresent,
} from "../../types/date";

type AirDateCountLabelProps = {
  episode: Episode;
  className?: string;
};

function AirDateCountLabel({ episode, className }: AirDateCountLabelProps) {
  console.log(episode);
  console.log(className);
  return (
    <div className={"flex flex-row " + className}>
      <ClockIcon className="h-6 w-5 mr-1 text-gray-500" />
      <div className="font-medium truncate italic text-gray-500">
        {episode.airDate == null || episode.airDate == ""
          ? "coming"
          : isDateInPast(new Date(episode.airDate))
          ? "released"
          : isDateInPresent(new Date(episode.airDate))
          ? "today"
          : isDateInFuture(new Date(episode.airDate)) &&
            `${daysUntilDate(new Date(episode.airDate))} days`}
      </div>
    </div>
  );
}

export default AirDateCountLabel;
