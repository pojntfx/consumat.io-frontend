import React from "react";
import { Media } from "../../lib/api/consumat-io";
import { isMovie } from "../../types/media";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardSearchProps = {
  media: Media;
  className?: string;
};

function MediaCardSearch({ media, className }: MediaCardSearchProps) {
  return (
    <MediaCardWrapper
      media={media}
      withMediaTypeTag={true}
      className={className}
    >
      <div className="mb-2">
        <div className="text-sm text-gray-500 truncate">
          {media.releaseInitial}
        </div>
        <div className="text-sm line-clamp-3 h-line-sm-3">{media.overview}</div>
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardSearch;
