import React from "react";
import renderer from "react-test-renderer";
import MediaCard from "../components/home/MediaCard";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaCard mediaItem={testExamples.exampleMediaItem} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
