import Link from "next/link";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Media } from "../../lib/api/consumat-io";
import styles from "../../styles/Search.module.css";
import { isMovie } from "../../types/helper";
import MediaImage from "../helper/MediaImage";

type SearchResultItemProps = {
  media: Media;
};

const SearchResultItem = ({ media }: SearchResultItemProps) => {
  const image = useImage(imageSizes.poster.w154, media.posterPath);

  // mx-2 my-1 md:mx-2.5 md:my-1.5

  return (
    <li>
      <Link
        href={"/" + media.__typename.toLocaleLowerCase() + "/" + media.code}
      >
        <a>
          <div className="relative card flex flex-row overflow-hidden bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 mb-3 cursor-pointer rounded">
            <div
              className={`absolute shadow bottom-2 md:bottom-3 rounded-r font-medium text-xs md:text-sm px-1 py-0.5 md:px-1.5
                ${
                  isMovie(media)
<<<<<<< HEAD
                    ? "text-white bg-gradient-to-r from-yellow-500 to-red-500"
                    : "text-white bg-gradient-to-r from-green-500 to-blue-500"
=======
                    ? "text-white bg-gradient-to-br from-yellow-500 to-red-500"
                    : "text-white bg-gradient-to-br from-green-500 to-blue-500"
>>>>>>> upstream/main
                }`}
            >
              {isMovie(media) ? "Movie" : "TV Series"}
            </div>

            <MediaImage className={styles.poster} imageSrc={image} />
            <div className="flex flex-col justify-between flex-shrink min-w-0 w-full mx-1.5 my-1.5 md:mx-2 md:my-1.5">
              <h3 className="md:text-xl text-lg md:leading-6 leading-5 font-bold truncate">
                {media.title}
              </h3>

              <div className="md:text-base text-sm text-gray-500 truncate">
                {media.releaseInitial}
              </div>

              <div className="md:text-base text-sm line-clamp-3 md:h-line-base-3 h-line-sm-3">
                {media.overview}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SearchResultItem;
