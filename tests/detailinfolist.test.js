import React from "react";
import renderer from "react-test-renderer";
import DetailInfoList from "../components/detail/DetailInfoList";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <DetailInfoList
        title={testExamples.exampleTitle}
        infos={testExamples.exampleInfos}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
