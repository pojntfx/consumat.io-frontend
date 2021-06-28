import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { Media } from "../../lib/api/consumat-io";
import { isMovie, isTv } from "../../types/media";
import { StatusMovie, StatusTv } from "../../types/status";

type MediaStatusLabelProps = {
  media: Media;
  className?: string;
};

function MediaStatusLabel({ media, className }: MediaStatusLabelProps) {
  return (
    <div className={"flex flex-row " + className}>
      {isMovie(media) ? (
        media.status == StatusMovie.Released ? (
          <>
            <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              released
            </div>
          </>
        ) : media.status == StatusMovie.Canceled ? (
          <>
            <EyeOffIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              canceled
            </div>
          </>
        ) : (
          <>
            <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              upcoming
            </div>
          </>
        )
      ) : (
        isTv(media) &&
        (media.status == StatusTv.ReturningSeries ? (
          <>
            <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              returning
            </div>
          </>
        ) : media.status == StatusTv.Canceled ? (
          <>
            <EyeOffIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              canceled
            </div>
          </>
        ) : media.status == StatusTv.Ended ? (
          <>
            <EyeOffIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              ended
            </div>
          </>
        ) : (
          <>
            <EyeIcon className="h-6 w-5 mr-1 text-gray-500" />
            <div className="font-medium truncate italic text-gray-500">
              upcoming
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default MediaStatusLabel;
