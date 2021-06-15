import { CalendarIcon } from "@heroicons/react/outline";
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
  return (
    <div className={"flex flex-row " + className}>
      {episode.airDate == null || episode.airDate == "" ? (
        <>
          <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
          <div className="font-medium truncate italic text-gray-500">
            coming
          </div>
        </>
      ) : isDateInPast(new Date(episode.airDate)) ? (
        <>
          <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
          <div className="font-medium truncate italic text-gray-500">
            released
          </div>
        </>
      ) : isDateInPresent(new Date(episode.airDate)) ? (
        <>
          <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
          <div className="font-medium truncate italic text-gray-500">today</div>
        </>
      ) : (
        isDateInFuture(new Date(episode.airDate)) && (
          <>
            <CalendarIcon className="h-6 w-5 ml-2 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              {daysUntilDate(new Date(episode.airDate)) + " days"}
            </div>
          </>
        )
      )}
    </div>
  );
}

export default AirDateCountLabel;
