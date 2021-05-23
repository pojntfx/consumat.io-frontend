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
    <div className="cardWithShadow">
      <h2 className="cardHeading">{title}</h2>
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
