import Link from "next/link";
import { Media } from "../../lib/api/consumat-io";
import styles from "../../styles/MediaList.module.css";
import MediaImage from "../dataDisplay/MediaImage";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { getMediaTypeFromString, MediaType } from "../../types/media";

type MediaCardHorizontalProps = {
  mediaItem: Media;
};

const MediaCardHorizontal = ({ mediaItem }: MediaCardHorizontalProps) => {
  return (
    <Link href={`/${mediaItem.__typename.toLowerCase()}/${mediaItem.code}`}>
      <a>
        <div className="inline-block w-24 sm:w-32 mr-1">
          <div
            className={
              styles.container +
              "w-24 sm:w-32 flex flex-col items-center justify-center rounded cursor-pointer shadow hover:shadow-md duration-75"
            }
          >
            <div className="overflow-hidden rounded">
              <MediaImage
                imageSrc={useImage(
                  imageSizes.poster.w185,
                  mediaItem.posterPath
                )}
                className={styles.img + " w-24 h-36 sm:w-32 sm:h-48"}
              />
            </div>

            <p
              className={
                "bg-gradient-to-br text-white z-10 text-sm py-2 px-1 text-center truncate w-full -mt-4 rounded" +
                (getMediaTypeFromString(mediaItem.__typename) ===
                MediaType.Movie
                  ? " from-yellow-500 to-red-500"
                  : " from-green-500 to-blue-500")
              }
              title={mediaItem.title}
            >
              {mediaItem.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MediaCardHorizontal;
