import { ApolloError } from "@apollo/client";
import { Media } from "../../lib/api/consumat-io";
import Spinner from "../helper/Spinner";
import ErrorMessage from "../helper/ErrorMessage";
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
    <div className="my-8 px-4 pb-4 bg-gradient-to-b from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md">
      <h2 className="inline-block -mt-3 mb-3 h-10 leading-10 px-3 rounded bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow">
        {title}
      </h2>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-media-list justify-evenly">
          {items.map((item, i) => {
            return <MediaCard key={i} mediaItem={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MediaList;
