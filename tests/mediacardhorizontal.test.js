import React from "react";
import renderer from "react-test-renderer";
import MediaCardHorizontal from "../components/dataDisplay/MediaCardHorizontal";
import testExamples from "./testExamples";

const mediaItemExample = testExamples.mediaItemExample;

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaCardHorizontal mediaItem={mediaItemExample} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
