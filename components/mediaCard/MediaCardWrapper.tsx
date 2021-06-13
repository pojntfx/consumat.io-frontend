import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Media } from "../../lib/api/consumat-io";
import { isMovie } from "../../types/media";
import MediaImage from "../helper/MediaImage";

type MediaCardWrapperProps = {
  media: Media;
  children: ReactNode;
  withMediaTypeTag?: boolean;
  className?: string;
};

function MediaCardWrapper({
  media,
  children,
  withMediaTypeTag,
  className,
}: MediaCardWrapperProps) {
  const image = useImage(imageSizes.poster.w154, media.posterPath);

  const router = useRouter();

  return (
    <li>
      <div
        className={
          "card clickableShallow flex flex-row overflow-hidden mb-3 h-30 " +
          className
        }
      >
        <Link
          href={"/" + media.__typename.toLocaleLowerCase() + "/" + media.code}
        >
          <a>
            <MediaImage imageSrc={image} className="h-full w-20" />
            {withMediaTypeTag && (
              <div
                className={`absolute bottom-2 rounded-r font-medium text-xs px-1 py-0.5
                ${
                  isMovie(media)
                    ? "text-white bg-gradient-to-br from-yellow-500 to-red-500"
                    : "text-white bg-gradient-to-br from-green-500 to-blue-500"
                }`}
              >
                {isMovie(media) ? "Movie" : "TV Series"}
              </div>
            )}
          </a>
        </Link>
        <Link
          href={"/" + media.__typename.toLocaleLowerCase() + "/" + media.code}
        >
          <a />
        </Link>
        <div className="min-w-0 w-full px-2">
          <div className="text-lg font-bold truncate mt-1">{media.title}</div>
          {children}
        </div>
      </div>
    </li>
  );
}

export default MediaCardWrapper;
