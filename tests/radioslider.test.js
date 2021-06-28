import React from "react";
import renderer from "react-test-renderer";
import RadioSlider from "../components/dataEntry/RadioSlider";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <RadioSlider
        options={testExamples.exampleOptions}
        value={testExamples.exampleValue}
        name={testExamples.exampleName}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
