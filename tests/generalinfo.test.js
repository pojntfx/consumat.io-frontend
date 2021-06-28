import React from "react";
import renderer from "react-test-renderer";
import GeneralInfoList from "../components/detail/GeneralInfoList";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(<GeneralInfoList infos={testExamples.exampleInfos} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
