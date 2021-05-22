import { CheckIcon, ReplyIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import {
  useGetSeasonEpisodes,
  useGetTvSeasons,
  useSetWatchStatus,
} from "../../hooks/DataHooks";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Media, Tv } from "../../lib/api/consumat-io";
import { MediaType } from "../../types/media";
import { WatchStatus } from "../../types/status";
import MediaImage from "../helper/MediaImage";
import Progressbar from "../helper/Progressbar";
import ContentTvWatching from "../MediaCardList/ContentTvWatching";
import MediaCardList from "../MediaCardList/MediaCardList";

type LibraryCardTvProps = {
  tv: Tv;
};

const LibraryCardTv = ({ tv }: LibraryCardTvProps) => {
  const image = useImage(imageSizes.poster.w154, tv.posterPath);
  const [updateWatchStatus, { loading, error }] = useSetWatchStatus();

  const Planning = () => {
    return (
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
    );
  };

  return (
    <li>
      <MediaCardList media={tv} className="mb-3">
        {tv.watchStatus === WatchStatus.Watching ? (
          <ContentTvWatching tv={tv} />
        ) : (
          tv.watchStatus === WatchStatus.Planning && <Planning />
        )}
      </MediaCardList>
    </li>
  );
};

export default LibraryCardTv;
