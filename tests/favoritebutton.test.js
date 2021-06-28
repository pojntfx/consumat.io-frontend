import React from "react";
import renderer from "react-test-renderer";
import FavoriteButton from "../components/dataEntry/FavoriteButton";
import testExamples from "./testExamples";
import { MockedProvider } from "@apollo/client/testing";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider mocks={testExamples.exampleMocks} addTypename={false}>
        <FavoriteButton media={testExamples.exampleMedia} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
