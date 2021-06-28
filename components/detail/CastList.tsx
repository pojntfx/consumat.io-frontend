import { Cast, Director } from "../../lib/api/consumat-io";
import MediaImage from "../dataDisplay/MediaImage";
import { imageSizes, useImage } from "../../hooks/ImageHook";

type CastListProps = {
  title: string;
  cast: Director[] | Cast[];
  className?: string;
};

const CastList = ({ title, cast, className }: CastListProps) => {
  console.log(title, cast);
  return (
    cast.length > 0 && (
      <div className={"cardWithShadow " + className}>
        <h3 className="cardHeading">{title}</h3>
        <div className="whitespace-nowrap overflow-x-auto">
          {cast.map((member, index) => {
            return (
              <div
                className="w-32 inline-block mr-1 mb-2 cursor-pointer bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow hover:shadow-md duration-75"
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
                <div className="h-11 py-1">
                  <p className="px-1 text-sm font-semibold truncate">
                    {member.name}
                  </p>
                  <p className="px-1 text-xs truncate">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default CastList;
