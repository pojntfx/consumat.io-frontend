import { ApolloError } from "@apollo/client";
import { Media } from "../../lib/api/consumat-io";
import Spinner from "../feedback/Spinner";
import ErrorMessage from "../feedback/ErrorMessage";
import MediaCard from "./MediaCard";

type MediaListProps = {
  title: string;
  loading: boolean;
  error: ApolloError;
  items: Media[];
};

const MediaList = ({ title, items, loading, error }: MediaListProps) => {
  if (error) return <ErrorMessage />;

  return (
    <>
      {items == null ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div
          className={`grid gap-3 grid-cols-media-list-mobile sm:grid-cols-media-list justify-evenly ${
            loading && "animate-pulse"
          }`}
        >
          {items.map((item, i) => {
            return <MediaCard key={i} mediaItem={item} />;
          })}
        </div>
      )}
    </>
  );
};

export default MediaList;
