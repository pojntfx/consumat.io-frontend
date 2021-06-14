import React from "react";
import { Movie } from "../../lib/api/consumat-io";
import ProviderList from "../helper/ProviderList";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardMoviePlanningProps = {
  movie: Movie;
};

function MediaCardMoviePlanning({ movie }: MediaCardMoviePlanningProps) {
  return (
    <MediaCardWrapper media={movie}>
      <div className="h-10">
        <ProviderList providers={movie.providers} />
      </div>
    </MediaCardWrapper>
  );
}

export default MediaCardMoviePlanning;
