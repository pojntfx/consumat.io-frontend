import { Dispatch, SetStateAction, useState } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Season } from "../../lib/api/consumat-io";
import SeasonEpisodeList from "./SeasonEpisodeList";

type SeasonOverviewProps = {
  season: Season;
  allSeasons: Season[];
  setAllSeasons: Dispatch<SetStateAction<Season[]>>;
};

const SeasonOverview = ({
  season,
  allSeasons,
  setAllSeasons,
}: SeasonOverviewProps) => {
  const [isEpisodeListVisible, setIsEpisodeListVisible] = useState(false);

  return (
    <div className="mb-4 w-full md:w-12/25 md:mx-1/100 lg:w-8/25 lg:mx-1">
      <div
        className="flex items-end h-32 rounded shadow hover:shadow-md duration-75"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.8))${
            season.posterPath &&
            `, url(${useImage(imageSizes.backdrop.w1280, season.posterPath)}`
          })`,
          backgroundColor: `${!season.posterPath && "rgba(31, 41, 55, 0.8)"}`,
          backgroundSize: "cover",
        }}
      >
        <button
          className="flex items-end w-full h-full p-2"
          onClick={() => setIsEpisodeListVisible(!isEpisodeListVisible)}
        >
          <h4
            className="text-white text-3xl text-left rounded"
            style={{ textShadow: "2px 2px 2px rgba(31, 41, 55)" }}
          >
            {season.title}
          </h4>
        </button>
      </div>
      {isEpisodeListVisible && (
        <SeasonEpisodeList
          season={season}
          allSeasons={allSeasons}
          setAllSeasons={setAllSeasons}
        />
      )}
    </div>
  );
};

export default SeasonOverview;
