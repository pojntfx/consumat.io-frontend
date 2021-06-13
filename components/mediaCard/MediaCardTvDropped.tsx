import React from "react";
import { Tv } from "../../lib/api/consumat-io";
import MediaCardWrapper from "./MediaCardWrapper";

type MediaCardTvDroppedProps = {
  tv: Tv;
};

function MediaCardTvDropped({ tv }: MediaCardTvDroppedProps) {
  return (
    <MediaCardWrapper media={tv}>
      <div></div>
    </MediaCardWrapper>
  );
}

export default MediaCardTvDropped;
