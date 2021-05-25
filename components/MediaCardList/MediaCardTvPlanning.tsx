import React from "react";
import { useSetWatchStatus } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";
import { MediaType } from "../../types/media";
import { WatchStatus } from "../../types/status";
import MediaCardWrapper from "../MediaCardList/MediaCardWrapper";

type MediaCardTvPlanningProps = {
  tv: Tv;
};

function MediaCardTvPlanning({ tv }: MediaCardTvPlanningProps) {
  const [updateWatchStatus, { loading, error }] = useSetWatchStatus();

  return (
    <MediaCardWrapper media={tv}>
      <div className="flex flex-col justify-center mx-2 h-full">
        <div className="flex flex-row justify-between mr-4">
          <button
            onClick={() =>
              updateWatchStatus({
                variables: {
                  code: tv.code,
                  media: MediaType.Tv,
                  watchStatus: WatchStatus.Watching,
                },
              })
            }
            className="button px-2"
          >
            Add Watch
          </button>
        </div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvPlanning;
