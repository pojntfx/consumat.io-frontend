import React, { ReactNode } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Media } from "../../lib/api/consumat-io";
import MediaImage from "../helper/MediaImage";

type MediaCardListProps = {
  media: Media;
  children: ReactNode;
  className?: string;
};

function MediaCardList({ media, children, className }: MediaCardListProps) {
  const image = useImage(imageSizes.poster.w154, media.posterPath);

  return (
    <div
      className={"card flex flex-row rounded overflow-hidden h-30 " + className}
    >
      <MediaImage imageSrc={image} className="w-20" />
      <div className="flex flex-col flex-shrink min-w-0 w-full">
        <div className="text-base font-bold truncate mt-1 mx-2">
          {media.title}
        </div>
        {children}
      </div>
    </div>
  );
}

export default MediaCardList;
