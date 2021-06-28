import React from "react";
import renderer from "react-test-renderer";
import SelectButton from "../components/dataEntry/SelectButton";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <SelectButton
        options={testExamples.exampleOptions}
        name={testExamples.exampleName}
        value={testExamples.exampleValue}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
