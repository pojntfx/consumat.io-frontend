import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "../components/feedback/ErrorMessage";

it("renders correctly", () => {
  const tree = renderer
    .create(<ErrorMessage message="An error occurred" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
