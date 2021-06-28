import React from "react";
import renderer from "react-test-renderer";
import ReleaseDateLabel from "../components/dataDisplay/ReleaseDateLabel";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<ReleaseDateLabel episode={testExamples.exampleEpisode} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
