import React from "react";
import { Movie } from "../../lib/api/consumat-io";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMovieDroppedProps = {
  movie: Movie;
};

function MediaCardMovieDropped({ movie }: MediaCardMovieDroppedProps) {
  return (
    <MediaCardWrapper media={movie}>
      <div></div>
    </MediaCardWrapper>
  );
}

export default MediaCardMovieDropped;
