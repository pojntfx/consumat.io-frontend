import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Movie } from "../../lib/api/consumat-io";
import MediaImage from "../helper/MediaImage";

type LibraryCardMovieProps = {
  movie: Movie;
};

const LibraryCardMovie = ({ movie }: LibraryCardMovieProps) => {
  const image = useImage(imageSizes.poster.w154, movie.posterPath);

  return (
    <li>
      <div className="flex flex-row card rounded overflow-hidden bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 mb-3">
        <MediaImage imageSrc={image} className="w-20" />
        <div className="w-full flex flex-col min-w-0 justify-center mx-2">
          <div className="text-base font-bold truncate">{movie.title}</div>
          <div className="flex flex-row justify-between">
            <div>{movie.ratingAverage}</div>
            <div>{movie.runtime}min</div>
            <div>{movie.releaseInitial}</div>
          </div>
          <div className="flex flex-row justify-between">
            <ul>
              {movie.providers.map((provider) => (
                <li key={provider.name}>{provider.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LibraryCardMovie;
