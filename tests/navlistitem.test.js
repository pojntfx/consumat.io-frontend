import React from "react";
import renderer from "react-test-renderer";
import NavListItem from "../components/navigation/NavListItem";

it("renders correctly", () => {
  const tree = renderer.create(<NavListItem href="/" />).toJSON();
  expect(tree).toMatchSnapshot();
});
