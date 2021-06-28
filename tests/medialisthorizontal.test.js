import React from "react";
import renderer from "react-test-renderer";
import MediaListHorizontal from "../components/dataDisplay/MediaListHorizontal";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MediaListHorizontal
        title={testExamples.exampleTitle}
        mediaPage={testExamples.exampleMediaPage}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
