import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "../components/dataEntry/SearchBar";
import testExamples from "./testExamples";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

it("renders correctly", () => {
  useRouter.mockImplementationOnce(() => ({
    query: { product: "coffee" },
  }));
  const tree = renderer.create(<SearchBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
