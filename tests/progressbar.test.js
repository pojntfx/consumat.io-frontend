import React from "react";
import renderer from "react-test-renderer";
import ProgressBar from "../components/dataDisplay/ProgressBar";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <ProgressBar
        progress={testExamples.exampleProgress}
        limit={testExamples.exampleLimit}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
