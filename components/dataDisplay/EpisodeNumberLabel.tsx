import React from "react";
import { EpisodeNumber } from "../../types/episodeNumber";

type EpisodeNumberLabelProps = {
  episodeNumber: EpisodeNumber;
  className?: string;
};

function EpisodeNumberLabel({
  episodeNumber,
  className,
}: EpisodeNumberLabelProps) {
  return (
    <div className={"flex flex-row " + className}>
      <div className="font-medium">
        S
        {episodeNumber.season.toLocaleString("en", {
          minimumIntegerDigits: 2,
        })}
      </div>
      <div className="-mx-0.5 font-medium">︱</div>
      <div className="font-medium">
        E
        {episodeNumber.episode.toLocaleString("en", {
          minimumIntegerDigits: 2,
        })}
      </div>
    </div>
  );
}

export default EpisodeNumberLabel;
