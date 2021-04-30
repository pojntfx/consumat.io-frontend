import { PhotographIcon } from "@heroicons/react/outline";
import { useState } from "react";

type ImageProps = {
  imageSrc: string;
  className?: string;
};

const MediaImage = ({ imageSrc, className }: ImageProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={className + " flex-shrink-0"}>
      {!isError ? (
        <img
          className="h-full w-full object-cover"
          src={imageSrc}
          onError={() => {
            setIsError(true);
          }}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-200">
          <PhotographIcon className="h-10 w-10 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default MediaImage;
