import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Media } from "../../lib/api/consumat-io";
import MediaImage from "../helper/MediaImage";

type LibraryItemProps = {
  media: Media;
};

const LibraryItem = ({ media }: LibraryItemProps) => {
  const image = useImage(imageSizes.poster.w154, media.posterPath);

  return (
    <li>
      <div className="flex flex-row card rounded overflow-hidden bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 mb-3 h-14">
        <MediaImage imageSrc={image} className="w-20" />
        <div className="w-full flex flex-col min-w-0 justify-center mx-2">
          <div className="text-base font-bold truncate">{media.title}</div>
          <div className="flex flex-row justify-between">
            <div className="text-base">S1</div>
            <div className="text-base">E12</div>
            <div className="text-base">watching</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LibraryItem;
