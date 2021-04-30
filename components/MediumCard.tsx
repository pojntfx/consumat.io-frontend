import Link from "next/link";
import styles from "../styles/MediaList.module.css";

type MediumCardProps = {
  key: number;
  code: number;
  title: string;
  imgSrc: string;
};

const MediumCard = ({ key, code, title, imgSrc }: MediumCardProps) => {
  return (
    <Link href={`/details/${code}`}>
      <div
        key={key}
        className={
          styles.container +
          " place-self-center w-32 flex flex-col items-center justify-center rounded cursor-pointer group"
        }
      >
        <div className="w-32 h-48 overflow-hidden rounded">
          <img
            src={imgSrc}
            alt={`${title} poster`}
            className={
              styles.img +
              " bg-gray-500 h-full object-cover z-0 rounded shadow group-hover:shadow-md duration-75"
            }
          />
        </div>
        <p
          className="bg-white z-10 text-sm py-2 px-1 text-center truncate w-full -mt-4 rounded shadow group-hover:shadow-md duration-75"
          title={title}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MediumCard;
