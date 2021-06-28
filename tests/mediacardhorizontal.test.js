import React from "react";
import renderer from "react-test-renderer";
import MediaCardHorizontal from "../components/dataDisplay/MediaCardHorizontal";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaCardHorizontal mediaItem={testExamples.exampleMediaItem} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
