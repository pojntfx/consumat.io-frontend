import React from "react";
import renderer from "react-test-renderer";
import EpisodeNumberLabel from "../components/dataDisplay/EpisodeNumberLabel";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <EpisodeNumberLabel
        className={testExamples.exampleClassname}
        episodeNumber={testExamples.exampleEpisodeNumber}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
