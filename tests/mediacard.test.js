import React from "react";
import renderer from "react-test-renderer";
import MediaCard from "../components/home/MediaCard";

const mediaItemExample = {
  backdropPath: "/2quGobxbtKu1WywX9y90fTbxsIW.jpg",
  cast: null,
  code: 117378,
  directors: null,
  favorite: false,
  genres: null,
  numberOfEpisodes: null,
  numberOfSeasons: null,
  overview:
    'Uma história de suspense centrada na pergunta-chave: "E se pudéssemos identificar antecipadamente os psicopatas?". Este drama conta a história do Jung Ba Reum, um policial novato em busca de justiça. A história segue Jung Ba Reum quando ele fica cara a cara com um psicopata louco que é assassino em série, cujos assassinatos implacáveis colocaram toda a nação em um caos. Então, depois de sobreviver ao seu encontro com este psicopata, a vida do Jung Ba Reum começa a mudar completamente.',
  popularity: 13.964,
  posterPath: "/l38PZlYba97ziaAsK3N3NPnQDtr.jpg",
  providers: null,
  ratingAverage: 8.3,
  ratingCount: 55,
  ratingUser: null,
  releaseFinal: null,
  releaseInitial: "2021-03-03",
  runtime: null,
  status: null,
  title: "Mouse",
  tmdbUrl: "https://www.themoviedb.org/tv/117378",
  watchStatus: null,
  __typename: "TV",
};

it("renders correctly", () => {
  const tree = renderer
    .create(<MediaCard mediaItem={mediaItemExample} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
