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
import DetailInfoList from "./DetailInfoList";
import CastList from "./CastList";
import DetailHeader from "./DetailHeader";
import TvDetails from "./TvDetails";
import SelectButton from "../helper/SelectButton";
import { useSetRating, useSetWatchStatus } from "../../hooks/DataHooks";
import GeneralInfoList from "./GeneralInfoList";
import { MediaInfo } from "./GeneralInfoList";

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
        type: getMediaTypeFromString(media.__typename),
        watchStatus: selectedWatchStatus,
      },
    });
  }, [selectedWatchStatus]);

  useEffect(() => {
    updateRating({
      variables: {
        code: media.code,
        type: media.__typename,
        rating: selectedRating,
      },
    });
  }, [selectedRating]);

  const getInfosForMediaType = (mediaType: MediaType): MediaInfo[] => {
    const mediaInfo: MediaInfo[] = [];
    mediaInfo.push({ description: "Status", value: media.status });
    mediaInfo.push({ description: "Runtime", value: `${media.runtime}min` });
    if (isTv(media)) {
      mediaInfo.push({
        description: "Airing Time",
        value: `${media.releaseInitial.replaceAll(
          "-",
          "."
        )} - ${media.releaseFinal.replaceAll("-", ".")}`,
      });
    } else if (isMovie(media)) {
      mediaInfo.push({
        description: "Release",
        value: media.releaseInitial.replaceAll("-", "."),
      });
    }

    return mediaInfo;
  };

  return (
    <div className="flex flex-col">
      <DetailHeader media={media} />

      <div className="px-8">
        <div className="flex flex-col sm:flex-row my-4">
          <div className="flex flex-col justify-evenly w-40 mr-2 flex-shrink-0">
            <SelectButton
              name="watchStatus"
              options={[
                "Watch Status",
                ...getValidWatchStatusForMediaType(mediaType),
              ]}
              value={
                selectedWatchStatus != null
                  ? selectedWatchStatus
                  : "Watch Status"
              }
              onChange={(event) => {
                setSelectedWatchStatus(
                  getWatchStatusFromString(event.target.value)
                );
              }}
              className={`mb-1 ${loadingUpdateWatchStatus && "animate-pulse"}`}
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
              value={media.ratingUser != null ? selectedRating.toString() : "1"}
              onChange={(event) =>
                setSelectedRating(parseFloat(event.target.value))
              }
              className={`${loadingUpdateRating && "animate-pulse"}`}
            />

            <a href={media.tmdbUrl} target="_blank">
              <button className="button mt-1 py-1 w-40">See on TMDb</button>
            </a>
          </div>
          <GeneralInfoList
            infos={getInfosForMediaType(mediaType)}
            className="w-full mt-8 sm:my-0"
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
