import React from "react";
import renderer from "react-test-renderer";
import CastList from "../components/detail/CastList";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<CastList cast={testExamples.exampleCast} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
