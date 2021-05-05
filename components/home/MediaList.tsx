import { ApolloError } from "@apollo/client";
import { GetSearchQuery } from "../../lib/api/consumat-io";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import Spinner from "../helper/Spinner";
import MediaCard from "./MediaCard";

type MediaListProps = {
  title: string;
  loading: boolean;
  error: ApolloError;
  items: GetSearchQuery;
};

const MediaList = ({ title, items, loading, error }: MediaListProps) => {
  if (error) return <h2>{error.message}</h2>;

  return (
    <div className="my-8 px-4 pb-4 bg-white rounded shadow-md">
      <h2 className="inline-block -mt-3 mb-3 h-10 leading-10 px-3 rounded bg-gray-800 text-gray-50 shadow">
        {title}
      </h2>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-media-list justify-evenly">
          {items.search.map((item, i) => {
            return (
              <MediaCard
                key={i}
                code={item.code}
                title={item.title}
                imageSrc={useImage(imageSizes.poster.w185, item.posterPath)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaList;
