import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import { Episode } from "../../lib/api/consumat-io";

type ReleaseDateLabelProps = {
  episode: Episode;
  className?: string;
};

function ReleaseDateLabel({ episode, className }: ReleaseDateLabelProps) {
  return (
    <div>
      <div className={"flex flex-row " + className}>
        <CalendarIcon className="h-6 w-5 mr-1 text-gray-500" />
        <div className="font-medium truncate italic text-gray-500">
          {episode.airDate == null || episode.airDate == ""
            ? "unknown"
            : episode.airDate}
        </div>
      </div>
    </div>
  );
}

export default ReleaseDateLabel;
