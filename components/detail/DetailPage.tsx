import { Media } from "../../lib/api/consumat-io";
import {
  getValidWatchStatusForMediaType,
  getWatchStatusFromString,
  WatchStatus,
} from "../../types/status";
import {
  getMediaTypeFromString,
  isMovie,
  isTv,
  MediaType,
} from "../../types/media";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import DetailInfoList from "./DetailInfoList";
import CastList from "./CastList";
import DetailHeader from "./DetailHeader";
import TvDetails from "./TvDetails";
import SelectButton from "../helper/SelectButton";
import { useSetRating, useSetWatchStatus } from "../../hooks/DataHooks";

type DetailPageProps = {
  media: Media;
};

const DetailPage = ({ media }: DetailPageProps) => {
  const [mediaType, setMediaType] = useState(
    isTv(media) ? MediaType.Tv : isMovie(media) ? MediaType.Movie : null
  );
  const [selectedWatchStatus, setSelectedWatchStatus] =
    useState<WatchStatus | null>(getWatchStatusFromString(media.watchStatus));

  // Commented out until backend makes rating nullable
  // const [selectedRating, setSelectedRating] = useState<number | null>(
  //   media.ratingUser
  // );
  const [selectedRating, setSelectedRating] = useState<number>(
    media.ratingUser === null ? 1 : media.ratingUser
  );

  const [
    updateWatchStatus,
    { loading: loadingUpdateWatchStatus, error: errorUpdateWatchStatus },
  ] = useSetWatchStatus();
  const [
    updateRating,
    { loading: loadingUpdateRating, error: errorUpdateRating },
  ] = useSetRating();

  useEffect(() => {
    updateWatchStatus({
      variables: {
        code: media.code,
        media: getMediaTypeFromString(media.__typename),
        watchStatus: selectedWatchStatus,
      },
    });
  }, [selectedWatchStatus]);

  useEffect(() => {
    updateRating({
      variables: {
        code: media.code,
        media: media.__typename,
        rating: selectedRating,
        seasonNumber: null,
        episodeNumber: null,
      },
    });
  }, [selectedRating]);

  return (
    <div className="flex flex-col">
      <DetailHeader media={media} />

      <div className="px-8">
        <div className="flex flex-col">
          <SelectButton
            name="watchStatus"
            options={[
              "Watch Status",
              ...getValidWatchStatusForMediaType(mediaType),
            ]}
            value={
              selectedWatchStatus !== null
                ? selectedWatchStatus
                : "Watch Status"
            }
            onChange={(event) => {
              setSelectedWatchStatus(
                getWatchStatusFromString(event.target.value)
              );
            }}
            className={`mt-2 mb-1 ${
              loadingUpdateWatchStatus && "animate-pulse"
            }`}
          />

          <SelectButton
            name="rating"
            options={[
              // Commented out for the time being because rating is not nullable
              // "Rating",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
            ]}
            value={media.ratingUser !== null ? selectedRating.toString() : "1"}
            onChange={(event) =>
              setSelectedRating(parseFloat(event.target.value))
            }
            className={`my-1 ${loadingUpdateRating && "animate-pulse"}`}
          />
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
