import { ApolloError } from "@apollo/client";
import { useState, useEffect } from "react";
import { useMovie } from "../hooks/DataHooks";
import { imgSizes, useImage } from "../hooks/ImageHook";
import { Episode, Movie, Season, Tv } from "../lib/api/consumat-io";
import Spinner from "./helper/Spinner";
import MediumCard from "./MediumCard";

// export enum ListType {
//   PopularMovies,
//   TopRatedMovies,
//   PopularTV,
//   TopRatedTV,
//   Recommended,
// }

export enum MediumType {
  Movie,
  TV,
  Season,
  Episode,
}

export type Medium = {
  code: number;
  title: string;
  poster: string;
  type: MediumType;
};

type MediaListProps = {
  title: string;
  loading: boolean;
  error: ApolloError;
  items: Medium[];
};

const MediaList = ({ title, items, loading, error }: MediaListProps) => {
  if (error) return <h2>{error.message}</h2>;

  return (
    <div className="mb-6 p-4 bg-white rounded shadow-md">
      <h2 className="mb-3">{title}</h2>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-media-list justify-evenly">
          {items.map((item) => {
            return (
              <MediumCard
                key={item.code}
                title={item.title}
                imgSrc={useImage(imgSizes.poster.w185, item.poster)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaList;
