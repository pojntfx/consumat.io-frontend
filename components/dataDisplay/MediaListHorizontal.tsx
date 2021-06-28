import { ApolloError } from "@apollo/client";
import { MediaPage } from "../../lib/api/consumat-io";
import LoadingDots from "../feedback/LoadingDots";
import Spinner from "../feedback/Spinner";
import MediaCardHorizontal from "./MediaCardHorizontal";

type MediaListHorizontalProps = {
  title: string;
  mediaPage?: MediaPage;
  loading: boolean;
  error: ApolloError;
  className?: string;
};

const MediaListHorizontal = ({
  title,
  mediaPage,
  loading,
  error,
  className,
}: MediaListHorizontalProps) => {
  console.log(mediaPage);
  if (mediaPage && mediaPage.results.length === 0) return null;

  return (
    <div className={"cardWithShadow " + className}>
      <h3 className="cardHeading max-w-full truncate">
        {title ? title : <LoadingDots />}
      </h3>
      {loading ? (
        <Spinner />
      ) : (
        mediaPage?.results.length > 0 && (
          <div className="whitespace-nowrap overflow-x-auto pb-2">
            {mediaPage.results.map((media, index) => {
              return <MediaCardHorizontal mediaItem={media} key={index} />;
            })}
          </div>
        )
      )}
    </div>
  );
};

export default MediaListHorizontal;
