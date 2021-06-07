import { HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Media } from "../../lib/api/consumat-io";
import { useSetFavorite } from "../../hooks/DataHooks";
import { getMediaTypeFromString } from "../../types/media";

type FavoriteButtonProps = {
  className?: string;
  media: Media;
};

const FavoriteButton = ({ className, media }: FavoriteButtonProps) => {
  const [isActive, setIsActive] = useState(
    media.favorite === null ? false : media.favorite
  );
  const [setFavorite, { loading: loadingFavorite, error: errorFavorite }] =
    useSetFavorite();

  useEffect(() => {
    setFavorite({
      variables: {
        code: media.code,
        type: getMediaTypeFromString(media.__typename),
        favorite: isActive,
        seasonNumber: null,
        episodeNumber: null,
      },
    });
  }, [isActive]);

  return (
    <button
      className={
        "bg-transparent focus:outline-none shadow-none hover:shadow-none " +
        className
      }
      onClick={() => setIsActive(!isActive)}
    >
      <HeartIcon
        className={`h-8 w-8 text-red-500 shadow-none hover:shadow-none hover:fill-current ${
          loadingFavorite && "animate-pulse"
        } ${isActive && "fill-current"}`}
      />
    </button>
  );
};

export default FavoriteButton;
