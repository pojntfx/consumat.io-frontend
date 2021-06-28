import React from "react";
import renderer from "react-test-renderer";
import CustomSelectButton from "../components/dataEntry/CustomSelectButton";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <CustomSelectButton
        labels={testExamples.exampleLabels}
        options={testExamples.exampleOptions}
        name={testExamples.exampleName}
        value={testExamples.exampleValue}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
