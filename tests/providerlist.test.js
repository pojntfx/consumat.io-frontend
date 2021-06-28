import React from "react";
import renderer from "react-test-renderer";
import ProviderList from "../components/dataDisplay/ProviderList";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<ProviderList providers={[testExamples.exampleProvider]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
