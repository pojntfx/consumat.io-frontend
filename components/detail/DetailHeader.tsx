import { Media } from "../../lib/api/consumat-io";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import MediaImage from "../helper/MediaImage";
import FavoriteButton from "../helper/FavoriteButton";

type DetailHeaderProps = {
  media: Media;
};

const DetailHeader = ({ media }: DetailHeaderProps) => {
  return (
    <div>
      <div
        className="flex items-end relative pl-52 bg-gray-500 w-full h-64 sm:h-96 -mt-4 rounded-b shadow-md"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.8)), url(${useImage(
            imageSizes.backdrop.w1280,
            media.backdropPath
          )})`,
          backgroundSize: "cover",
        }}
      >
        <FavoriteButton className="absolute right-4 top-4" media={media} />
        <h2
          className="text-white text-2xl sm:text-4xl md:text-6xl px-0 sm:px-2 pb-4 max-w-sm md:max-w-2xl"
          style={{ textShadow: "2px 2px 2px rgba(31, 41, 55)" }}
        >
          {media.title}
        </h2>
      </div>
      <div className="px-8">
        <div className="relative w-40">
          <span
            className={`flex items-center justify-center text-white font-semibold absolute w-10 h-10 -top-3 -right-3 rounded-full shadow ${
              media.ratingAverage < 5
                ? "bg-red-500"
                : media.ratingAverage < 6.5
                ? "bg-yellow-500"
                : media.ratingAverage < 8
                ? "bg-green-500"
                : "bg-green-700"
            }`}
          >
            {media.ratingAverage}
          </span>
          <div className="w-40 h-60 -mt-48 overflow-hidden rounded self-center shadow-md md:flex-shrink-0">
            <MediaImage
              className="w-40 h-60"
              imageSrc={useImage(imageSizes.poster.w500, media.posterPath)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
