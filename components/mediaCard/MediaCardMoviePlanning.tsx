import React from "react";
import { Movie } from "../../lib/api/consumat-io";
import MediaStatus from "../helper/MediaStatus";
import ProviderList from "../helper/ProviderList";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMoviePlanningProps = {
  movie: Movie;
};

function MediaCardMoviePlanning({ movie }: MediaCardMoviePlanningProps) {
  return (
    <MediaCardWrapper media={movie}>
      <div className="h-10">
        <MediaStatus media={movie} />
        <ProviderList providers={movie.providers} className="mt-1" />
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardMoviePlanning;
