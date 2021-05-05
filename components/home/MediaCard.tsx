import Link from "next/link";
import styles from "../../styles/MediaList.module.css";
import MediaImage from "../helper/MediaImage";

type MediaCardProps = {
  code: number;
  title: string;
  imageSrc: string;
};

const MediaCard = ({ code, title, imageSrc }: MediaCardProps) => {
  return (
    <Link href={`/movie/${code}`}>
      <a>
        <div
          className={
            styles.container +
            " place-self-center w-32 flex flex-col items-center justify-center rounded cursor-pointer shadow hover:shadow-md duration-75"
          }
        >
          <div className="overflow-hidden rounded">
            <MediaImage
              imageSrc={imageSrc}
              className={styles.img + " w-32 h-48"}
            />
          </div>

          <p
            className="bg-white z-10 text-sm py-2 px-1 text-center truncate w-full -mt-4 rounded"
            title={title}
          >
            {title}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default MediaCard;
