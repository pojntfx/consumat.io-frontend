import MetaData from "../../components/MetaData";
import { useRouter } from "next/router";
import { useMovie } from "../../hooks/DataHooks";
import styles from "../../styles/Details.module.css";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useMovie(parseInt("" + id));

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div>
        <MetaData title="consumat.io | Home" />
        <div className="relative py-8 px-4">
          <div className="z-20 relative h-96 ">
            <img
              className={styles.detailsPoster}
              src={"https://image.tmdb.org/t/p/original" + data.movie.poster}
            />
          </div>
          <div className="absolute inset-0 h-auto z-10">
            <img
              src={"https://image.tmdb.org/t/p/original" + data.movie.backdrop}
              className={styles.detailsBackdrop}
            />
          </div>
        </div>
        <div className="z-40 flex flex-col absolute md:left-72 md:top-96">
          <h1 className="text-center sm:text-left sm:ml-10 mb-10 text-black sm:px-0 sm:text-white text-8xl 2xl:bottom-0 mt-24 md:mt-10">
            {data.movie.title}
          </h1>
          <p className="sm:ml-10 text-black text-xs md:text-2xl">
            {data.movie.overview}
          </p>
        </div>
        <div className=" h-96 mt-96 md:mt-56 md:ml-16">
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col items-center md:items-start">
              <p className="bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                {data.movie.releaseDate}
              </p>
              <p className="bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                {data.movie.runtime}
              </p>
              <p className="bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                {data.movie.voteAverage}
              </p>
              <p className="bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                {data.movie.popularity}
              </p>
              <a href={data.movie.tmdb} className="underline">
                More Details
              </a>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <p className="md:ml-40 bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                  Genres
                </p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.genres.map(({ name }, key) => {
                    return (
                      <p
                        key={key}
                        className={
                          key == 0
                            ? "ml-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            : "ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        }
                      >
                        {name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center mt-2 md:items-start">
                <p className="md:ml-40 bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                  Cast
                </p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.cast.map(({ name }, key) => {
                    return (
                      <>
                        {key < 5 ? (
                          <p
                            key={key}
                            className={
                              key == 0
                                ? "ml-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                : "ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            }
                          >
                            {name}
                          </p>
                        ) : (
                          <> </>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center mt-2 md:items-start">
                <p className="md:ml-40 bg-white  text-gray-800 font-semibold py-2 mb-2 px-4 border border-gray-400 rounded shadow">
                  Director
                </p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.directors.map(({ name }, key) => {
                    return (
                      <p
                        key={key}
                        className={
                          key == 0
                            ? "ml-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            : "ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        }
                      >
                        {name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
