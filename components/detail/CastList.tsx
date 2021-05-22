import { Cast, Director } from "../../lib/api/consumat-io";
import MediaImage from "../helper/MediaImage";
import { imageSizes, useImage } from "../../hooks/ImageHook";

type CastListProps = {
  title: string;
  cast: Director[] | Cast[];
  className?: string;
};

const CastList = ({ title, cast, className }: CastListProps) => {
  return (
    cast.length > 0 && (
      <div
        className={
          "my-8 px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md " +
          className
        }
      >
        <h3 className="inline-block -mt-3 mb-3 h-8 leading-8 px-2 rounded bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow">
          {title}
        </h3>
        <div className="whitespace-nowrap overflow-x-auto">
          {cast.map((member, index) => {
            return (
              <div
                className="w-32 inline-block mr-1 cursor-pointer bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow hover:shadow-md duration-75"
                key={index}
              >
                <div className="w-32 h-48 rounded-t overflow-hidden">
                  <MediaImage
                    className="w-32 h-48"
                    imageSrc={useImage(
                      imageSizes.poster.w500,
                      member.imagePath
                    )}
                  />
                </div>
                <p className="p-1 text-sm font-semibold truncate">
                  {member.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default CastList;
