import React from "react";
import renderer from "react-test-renderer";
import EpisodeNumberLabel from "../components/dataDisplay/EpisodeNumberLabel";

const exampleEpisodeNumber = {
  season: 2,
  episode: 5,
};
const exampleClassname = "ml-2";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <EpisodeNumberLabel
        className={exampleClassname}
        episodeNumber={exampleEpisodeNumber}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
