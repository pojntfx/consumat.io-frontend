import React from "react";
import renderer from "react-test-renderer";
import MediaImage from "../components/dataDisplay/MediaImage";
import testExamples from "./testExamples";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MediaImage
        imageSrc={testExamples.exampleImgSrc}
        className={testExamples.exampleClassname}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
