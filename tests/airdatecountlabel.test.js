import React from "react";
import renderer from "react-test-renderer";
import AirDateCountLabel from "../components/dataDisplay/AirDateCountLabel";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AirDateCountLabel
        className={testExamples.exampleClassname}
        episode={testExamples.exampleEpisode}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
