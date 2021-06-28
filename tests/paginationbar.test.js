import React from "react";
import renderer from "react-test-renderer";
import PaginationBar from "../components/dataEntry/PaginationBar";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <PaginationBar
        page={testExamples.examplePage}
        maxPages={testExamples.exampleMaxPages}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
