import React from "react";
import renderer from "react-test-renderer";
import NavList from "../components/navigation/NavList";

it("renders correctly", () => {
  const tree = renderer.create(<NavList />).toJSON();
  expect(tree).toMatchSnapshot();
});
