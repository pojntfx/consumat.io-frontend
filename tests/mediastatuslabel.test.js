import React from "react";
import renderer from "react-test-renderer";
import MediaStatusLabel from "../components/dataDisplay/MediaStatusLabel";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaStatusLabel media={testExamples.exampleMedia} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
