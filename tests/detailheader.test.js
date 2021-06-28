import React from "react";
import renderer from "react-test-renderer";
import DetailHeader from "../components/detail/DetailHeader";
import testExamples from "./testExamples";
import { MockedProvider } from "@apollo/client/testing";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={testExamples.exampleMocks} addTypename={false}>
        <DetailHeader media={testExamples.exampleMedia} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
