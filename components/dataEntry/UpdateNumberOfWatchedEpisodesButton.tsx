import { ApolloError } from "@apollo/client";
import { ReactNode, useEffect } from "react";
import { useSetNumberOfWatchedEpisodes } from "../../hooks/DataHooks";
import { Tv } from "../../lib/api/consumat-io";

type NumberOfWatchedEpisodesButtonProps = {
  tv: Tv;
  season: number;
  numberOfWatchedEpisodes: number;
  disabled?: boolean;
  onClick?: () => void;
  onCompleted?: () => void;
  onError?: (error: ApolloError) => void;
  className?: string;
  children?: ReactNode;
};

function NumberOfWatchedEpisodesButton({
  tv,
  season,
  numberOfWatchedEpisodes,
  disabled,
  onClick,
  onCompleted,
  onError,
  className,
  children,
}: NumberOfWatchedEpisodesButtonProps) {
  const [updateNumberOfWatchedEpisodes, { data, loading, error }] =
    useSetNumberOfWatchedEpisodes();

  useEffect(() => {
    if (!loading && data != null && data.numberOfWatchedEpisodes.status)
      onCompleted?.();
  }, [data]);

  useEffect(() => {
    if (error) onError?.(error);
  }, [error]);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClick?.();
        updateNumberOfWatchedEpisodes({
          variables: {
            code: tv.code,
            seasonNumber: season,
            numberOfWatchedEpisodes: numberOfWatchedEpisodes,
          },
        });
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export default NumberOfWatchedEpisodesButton;
