import { ApolloError } from "@apollo/client";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useSetWatchStatus } from "../../hooks/DataHooks";
import { Media } from "../../lib/api/consumat-io";
import { WatchStatus } from "../../types/status";

type WatchStatusButtonProps = {
  media: Media;
  watchStatus: WatchStatus;
  onCompleted?: () => void;
  onError?: (error: ApolloError) => void;
  className?: string;
};

function WatchStatusButton({
  media,
  watchStatus,
  onCompleted,
  onError,
  className,
}: WatchStatusButtonProps) {
  const [updateWatchStatus, { loading, data, error }] = useSetWatchStatus();

  useEffect(() => {
    if (!loading && data != null && data.watchStatus.status) onCompleted?.();
  }, [data]);

  useEffect(() => {
    if (error) onError?.(error);
  }, [error]);

  return (
    <button
      onClick={() =>
        updateWatchStatus({
          variables: {
            code: media.code,
            type: media.__typename,
            watchStatus: watchStatus,
          },
        })
      }
      className={
        "button text-sm w-max py-1.5 pl-1.5 pr-3 flex flex-row truncat " +
        className
      }
    >
      <ClipboardCopyIcon className="h-6 w-6 mr-1 -my-0.5" />
      <div>{"Move to " + watchStatus}</div>
    </button>
  );
}

export default WatchStatusButton;
