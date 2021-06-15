import { ApolloError } from "@apollo/client";
import React, { ReactNode, useEffect } from "react";
import { useSetWatchStatus } from "../../hooks/DataHooks";
import { Media } from "../../lib/api/consumat-io";
import { WatchStatus } from "../../types/status";

type UpdateWatchStatusButtonProps = {
  media: Media;
  watchStatus: WatchStatus;
  disabled?: boolean;
  onClick?: () => void;
  onCompleted?: () => void;
  onError?: (error: ApolloError) => void;
  className?: string;
  children?: ReactNode;
};

function UpdateWatchStatusButton({
  media,
  disabled,
  watchStatus,
  onClick,
  onCompleted,
  onError,
  className,
  children,
}: UpdateWatchStatusButtonProps) {
  const [updateWatchStatus, { loading, data, error }] = useSetWatchStatus();

  useEffect(() => {
    if (!loading && data != null && data.watchStatus.status) onCompleted?.();
  }, [data]);

  useEffect(() => {
    if (error) onError?.(error);
  }, [error]);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClick?.();
        updateWatchStatus({
          variables: {
            code: media.code,
            type: media.__typename,
            watchStatus: watchStatus,
          },
        });
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export default UpdateWatchStatusButton;
