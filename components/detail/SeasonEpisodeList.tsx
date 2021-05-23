import { useGetSeasonEpisodes } from "../../hooks/DataHooks";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { WatchStatus } from "../../types/status";
import MediaImage from "../helper/MediaImage";
import Spinner from "../helper/Spinner";

type SeasonEpisodeListProps = {
  tvCode: number;
  seasonNumber: number;
};

const SeasonEpisodeList = ({
  tvCode,
  seasonNumber,
}: SeasonEpisodeListProps) => {
  const {
    data: episodesData,
    loading: episodesLoading,
    error: episodesError,
  } = useGetSeasonEpisodes(tvCode, seasonNumber);

  return (
    <ul>
      {episodesLoading && <Spinner className="my-8" />}
      {episodesData?.seasonEpisodes?.map((episode, index) => {
        return (
          <li key={index}>
            {/* <button
              className={`flex w-full rounded my-1 p-2 ${
                episode.watchStatus === WatchStatus.Finished
                  ? "border-none bg-green-500 text-white hover:border-transparent hover:bg-red-500 hover:text-white"
                  : "border-2 border-gray-800 text-gray-800 hover:border-transparent hover:bg-green-500 hover:text-white"
              }`}
            > */}
            <button className="flex items-center w-full h-20 rounded overflow-hidden my-1 ring-1 ring-inset ring-gray-200">
              <MediaImage
                imageSrc={useImage(imageSizes.still.w185, episode.stillPath)}
                className="w-20 h-full"
              />
              <div className="flex flex-col justify-center h-full text-left p-1 ml-1">
                <p className="font-semibold truncate">
                  {episode.episodeNumber}. {episode.title}
                </p>
                <p className="text-sm line-clamp-2">{episode.overview}</p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SeasonEpisodeList;
