import React from "react";
import renderer from "react-test-renderer";
import AirDateCountLabel from "../components/dataDisplay/AirDateCountLabel";

const exampleEpisode = {
  airDate: "2014-11-15",
  code: 1048387,
  episodeNumber: 3,
  favorite: false,
  overview: "",
  ratingAverage: 10,
  seasonNumber: 1,
  stillPath: "/82FnB03dqAcAyh3mI0AuwwDUiJX.jpg",
  title: "Episódio 3",
  __typename: "Episode",
};
const exampleClassname = "ml-2";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <AirDateCountLabel
        className={exampleClassname}
        episode={exampleEpisode}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
