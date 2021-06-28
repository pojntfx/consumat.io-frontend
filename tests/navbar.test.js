import React from "react";
import renderer from "react-test-renderer";
import Navbar from "../components/navigation/Navbar";

it("renders correctly", () => {
  const tree = renderer.create(<Navbar />).toJSON();
  expect(tree).toMatchSnapshot();
});
