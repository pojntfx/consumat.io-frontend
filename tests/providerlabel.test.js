import React from "react";
import renderer from "react-test-renderer";
import ProviderLabel from "../components/dataDisplay/ProviderLabel";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<ProviderLabel provider={testExamples.exampleProvider} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
