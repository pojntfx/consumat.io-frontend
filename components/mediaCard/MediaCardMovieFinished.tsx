import React from "react";
import { Movie } from "../../lib/api/consumat-io";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMovieFinishedProps = {
  movie: Movie;
};

function MediaCardMovieFinished({ movie }: MediaCardMovieFinishedProps) {
  return (
    <MediaCardWrapper media={movie}>
      <div></div>
    </MediaCardWrapper>
  );
}

export default MediaCardMovieFinished;
