import Link from "next/link";
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
    //<Link href={"/" + media.__typename.toLocaleLowerCase() + "/" + media.code}>
    //<a>
    <div
      className={
        "card clickable flex flex-row rounded overflow-hidden h-30 " + className
      }
    >
      <MediaImage imageSrc={image} className="w-20" />
      <div className="flex flex-col flex-shrink min-w-0 w-full">
        <div className="text-base font-bold truncate mt-1 mx-2">
          {media.title}
        </div>
        {children}
      </div>
    </div>
    //</a>
    //</Link>
  );
}

export default MediaCardList;
