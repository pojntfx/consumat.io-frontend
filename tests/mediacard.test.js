import React from "react";
import renderer from "react-test-renderer";
import MediaCard from "../components/home/MediaCard";
import testExamples from "./testExamples";

const mediaItemExample = testExamples.mediaItemExample;

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaCard mediaItem={mediaItemExample} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
