import React from "react";
import { Movie } from "../../lib/api/consumat-io";
import MediaStatusLabel from "../dataDisplay/MediaStatusLabel";
import ProviderList from "../dataDisplay/ProviderList";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMoviePlanningProps = {
  movie: Movie;
};

function MediaCardMoviePlanning({ movie }: MediaCardMoviePlanningProps) {
  return (
    <MediaCardWrapper media={movie}>
      <div className="h-10">
        <MediaStatusLabel media={movie} />
        <ProviderList providers={movie.providers} className="mt-1" />
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardMoviePlanning;
