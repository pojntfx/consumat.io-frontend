import { Tv } from "../../lib/api/consumat-io";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvFinishedProps = {
  tv: Tv;
};

function MediaCardTvFinished({ tv }: MediaCardTvFinishedProps) {
  return (
    <MediaCardWrapper media={tv}>
      <div></div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvFinished;
