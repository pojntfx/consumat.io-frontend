import { Media } from "../../lib/api/consumat-io";
import { getWatchStatusFromString, WatchStatus } from "../../types/status";
import { getMediaTypeFromString, isTv } from "../../types/media";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DetailInfoList from "./DetailInfoList";
import CastList from "./CastList";
import DetailHeader from "./DetailHeader";
import TvDetails from "./TvDetails";

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
        media: getMediaTypeFromString(media.__typename),
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

  return (
    <div className="flex flex-col">
      <DetailHeader media={media} />

      <div className="px-8">
        <div className="flex flex-col">
          <select
            className="bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white rounded mt-2 w-40 py-2 px-2 cursor-pointer"
            name="watchStatus"
            id="watchStatus"
            value={
              selectedWatchStatus !== null
                ? selectedWatchStatus
                : "Watch Status"
            }
            onChange={(e) => {
              setSelectedWatchStatus(getWatchStatusFromString(e.target.value));
            }}
          >
            <option value="" className="bg-white dark:bg-gray-800">
              {"Watch Status"}
            </option>
            {Object.keys(WatchStatus).map((key, index) => {
              return (
                // As a temporary solution, only show "Planning"
                WatchStatus[key] === "Planning" && (
                  <option
                    value={WatchStatus[key]}
                    key={index}
                    className="bg-white dark:bg-gray-800"
                  >
                    {WatchStatus[key]}
                  </option>
                )
              );
            })}
          </select>

          <select
            className="bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white rounded mt-2 w-40 py-2 px-2 cursor-pointer"
            name="watchStatus"
            id="watchStatus"
            value={media.ratingUser !== null ? media.ratingUser : "Rating"}
          >
            <option value="" className="bg-white dark:bg-gray-800">
              {"Rating"}
            </option>
            <option value="1" className="bg-white dark:bg-gray-800">
              {"1"}
            </option>
            <option value="2" className="bg-white dark:bg-gray-800">
              {"2"}
            </option>
            <option value="3" className="bg-white dark:bg-gray-800">
              {"3"}
            </option>
            <option value="4" className="bg-white dark:bg-gray-800">
              {"4"}
            </option>
            <option value="5" className="bg-white dark:bg-gray-800">
              {"5"}
            </option>
            <option value="6" className="bg-white dark:bg-gray-800">
              {"6"}
            </option>
            <option value="7" className="bg-white dark:bg-gray-800">
              {"7"}
            </option>
            <option value="8" className="bg-white dark:bg-gray-800">
              {"8"}
            </option>
            <option value="9" className="bg-white dark:bg-gray-800">
              {"9"}
            </option>
            <option value="10" className="bg-white dark:bg-gray-800">
              {"10"}
            </option>
          </select>
        </div>

        <div className="bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 my-8 px-4 pb-4 rounded shadow-md">
          <h3 className="inline-block -mt-3 mb-3 h-8 leading-8 px-2 rounded bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow">
            Overview
          </h3>
          <p className="md:text-xl text-justify">{media.overview}</p>
        </div>

        <DetailInfoList
          title="Genres"
          infos={media.genres.map((genre) => genre.name)}
        />

        <div className="lg:flex">
          <CastList
            title={media.directors.length > 1 ? "Directors" : "Director"}
            cast={media.directors}
            className="lg:w-29/100"
          />

          <CastList
            title="Cast"
            cast={media.cast}
            className="lg:w-7/10 lg:ml-1/100"
          />
        </div>

        <DetailInfoList
          title="Providers"
          infos={media.providers.map((provider) => provider.name)}
        />

        {isTv(media) && <TvDetails tv={media} />}
      </div>
    </div>
  );
};

export default DetailPage;
