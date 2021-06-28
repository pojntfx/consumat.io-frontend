import React from "react";
import renderer from "react-test-renderer";
import MetaData from "../components/MetaData";

it("renders correctly", () => {
  const tree = renderer.create(<MetaData />).toJSON();
  expect(tree).toMatchSnapshot();
});
