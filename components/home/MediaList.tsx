import { ApolloError } from "@apollo/client";
import { Media, MediaPage } from "../../lib/api/consumat-io";
import Spinner from "../feedback/Spinner";
import ErrorMessage from "../feedback/ErrorMessage";
import MediaCard from "./MediaCard";
import PaginationBar from "../dataEntry/PaginationBar";
import { Dispatch, SetStateAction } from "react";

type MediaListProps = {
  title: string;
  mediaPage?: MediaPage;
  previouslyLoadedMediaPage?: MediaPage;
  pageNumber?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  loading: boolean;
  error: ApolloError;
};

const MediaList = ({
  title,
  mediaPage,
  previouslyLoadedMediaPage,
  pageNumber,
  setPage,
  loading,
  error,
}: MediaListProps) => {
  if (error) return <ErrorMessage />;

  return (
    <div className="cardWithShadow">
      <h2 className="cardHeading">{title}</h2>
      {mediaPage == null && previouslyLoadedMediaPage == null ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div
          className={`grid gap-3 grid-cols-media-list-mobile sm:grid-cols-media-list justify-evenly ${
            loading && "animate-pulse"
          }`}
        >
          {mediaPage
            ? mediaPage.results.map((item, i) => {
                return <MediaCard key={i} mediaItem={item} />;
              })
            : previouslyLoadedMediaPage.results.map((item, i) => {
                return <MediaCard key={i} mediaItem={item} />;
              })}
        </div>
      )}

      {pageNumber && setPage && (
        <PaginationBar
          page={pageNumber}
          maxPages={
            mediaPage
              ? mediaPage.totalPages
              : previouslyLoadedMediaPage
              ? previouslyLoadedMediaPage.totalPages
              : null
          }
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default MediaList;
