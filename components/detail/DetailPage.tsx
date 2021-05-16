import { Media } from "../../lib/api/consumat-io";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import MediaImage from "../helper/MediaImage";
import { WatchStatus } from "../../types/status";
import { MediaType } from "../../types/media";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

type DetailPageProps = {
  media: Media;
};

const SET_WATCH_STATUS = gql`
  mutation SetWatchStatus($code: Int!, $media: String!, $watchStatus: String!) {
    watchStatus(code: $code, media: $media, watchStatus: $watchStatus) {
      status
    }
  }
`;

const DetailPage = ({ media }: DetailPageProps) => {
  const [selectedWatchStatus, setSelectedWatchStatus] =
    useState<WatchStatus | null>(getWatchStatusFromString(media.watchStatus));
  const [updateWatchStatus, { loading, error }] = useMutation(SET_WATCH_STATUS);

  useEffect(() => {
    if (selectedWatchStatus === null) return;

    updateWatchStatus({
      variables: {
        code: media.code,
        media: media.__typename === "Movie" ? MediaType.Movie : MediaType.Tv,
        watchStatus: selectedWatchStatus,
      },
    });

    {
      loading && console.log("Loading...");
    }

    {
      !loading && console.log("Updated successfully!");
    }
  }, [selectedWatchStatus]);

  function getWatchStatusFromString(str: string): WatchStatus | null {
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

  return (
    <div>
      <div
        className="bg-gray-500 w-full h-64 sm:h-96 -mt-4 rounded-b shadow-md"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.8)), url(${useImage(
            imageSizes.backdrop.w1280,
            media.backdropPath
          )})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex flex-col md:flex-row -mt-48 md:-mt-32 md:ml-14 px-4 md:px-8">
        <div className="w-40 h-60 overflow-hidden rounded self-center shadow-md md:flex-shrink-0">
          <MediaImage
            className="w-40 h-60"
            imageSrc={useImage(imageSizes.poster.w500, media.posterPath)}
          />
        </div>
        <div className="md:flex md:flex-col md:justify-center md:ml-4 md:flex-shrink">
          <h2 className="inline-block md:flex md:items-end text-4xl mt-4 md:m-0 md:h-1/2 px-3 py-2 md:p-0 rounded bg-gradient-to-br md:from-transparent md:to-transparent from-gray-700 to-gray-800 text-white">
            {media.title}
          </h2>
          <p className="md:flex md:items-start md:pt-4 md:text-xl px text-justify md:h-1/2 mt-2 md:m-0 max-w-xl">
            {media.overview}
          </p>
        </div>
      </div>
      <div className="md:ml-14 px-4 md:px-8">
        <select
          className="rounded mt-2 w-40 py-2 px-2 cursor-pointer"
          name="watchStatus"
          id="watchStatus"
          value={selectedWatchStatus !== null ? selectedWatchStatus : ""}
          onChange={(e) => {
            setSelectedWatchStatus(getWatchStatusFromString(e.target.value));
          }}
        >
          <option value="">{""}</option>
          {Object.keys(WatchStatus).map((key, index) => {
            return (
              // As a temporary solution, only show "Planning"
              WatchStatus[key] === "Planning" && (
                <option value={WatchStatus[key]} key={index}>
                  {WatchStatus[key]}
                </option>
              )
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DetailPage;
