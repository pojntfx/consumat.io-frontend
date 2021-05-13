import Link from "next/link";
import { Media } from "../../lib/api/consumat-io";
import styles from "../../styles/MediaList.module.css";
import MediaImage from "../helper/MediaImage";
import { imageSizes, useImage } from "../../hooks/ImageHook";

type MediaCardProps = {
  mediaItem: Media;
};

const MediaCard = ({ mediaItem }: MediaCardProps) => {
  return (
    <Link href={`/${mediaItem.__typename.toLowerCase()}/${mediaItem.code}`}>
      <a>
        <div
          className={
            styles.container +
            " place-self-center w-32 flex flex-col items-center justify-center rounded cursor-pointer shadow hover:shadow-md duration-75"
          }
        >
          <div className="overflow-hidden rounded">
            <MediaImage
              imageSrc={useImage(imageSizes.poster.w185, mediaItem.posterPath)}
              className={styles.img + " w-32 h-48"}
            />
          </div>

          <p
            className={
              "bg-white bg-gradient-to-r z-10 text-sm py-2 px-1 text-center truncate w-full -mt-4 rounded" +
              (mediaItem.__typename === "Movie"
                ? " from-yellow-500 to-red-500"
                : " from-green-500 to-blue-500")
            }
            title={mediaItem.title}
          >
            {mediaItem.title}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default MediaCard;
