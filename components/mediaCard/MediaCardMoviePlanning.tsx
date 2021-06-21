import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Movie } from "../../lib/api/consumat-io";
import { WatchStatus } from "../../types/status";
import MediaStatusLabel from "../dataDisplay/MediaStatusLabel";
import UpdateWatchStatusButton from "../dataEntry/UpdateWatchStatusButton";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMoviePlanningProps = {
  movie: Movie;
};

function MediaCardMoviePlanning({ movie }: MediaCardMoviePlanningProps) {
  //
  const [isInList, setIsInList] = useState(true);

  return (
    <MediaCardWrapper media={movie}>
      {isInList ? (
        <div className="flex flex-col">
          <div className="h-12">
            <MediaStatusLabel media={movie} />
          </div>
          <UpdateWatchStatusButton
            media={movie}
            watchStatus={WatchStatus.Finished}
            onCompleted={() => setIsInList(false)}
            className="button buttonStandard"
          >
            <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
            <div>{`Move to ${WatchStatus.Finished}`}</div>
          </UpdateWatchStatusButton>
        </div>
      ) : (
        <div className="h-20 flex items-center">
          <div className="text-lg font-medium italic text-gray-500">
            Moved to {WatchStatus.Finished}
          </div>
        </div>
      )}
    </MediaCardWrapper>
  );
}

export default MediaCardMoviePlanning;
