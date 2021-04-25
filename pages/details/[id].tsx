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
        <div className={styles.detailsTextContainer}>
          <h1 className={styles.detailsTitle}>{data.movie.title}</h1>
          <p className={styles.detailsOverview}>{data.movie.overview}</p>
        </div>
        <div className=" h-96 mt-96 md:mt-56 md:ml-16">
          <div className="flex flex-col sm:flex-row">
            <div className={styles.detailsRowContainer}>
              <p className={styles.detailsStat}>{data.movie.releaseDate}</p>
              <p className={styles.detailsStat}>{data.movie.runtime}</p>
              <p className={styles.detailsStat}>{data.movie.voteAverage}</p>
              <p className={styles.detailsStat}>{data.movie.popularity}</p>
              <a href={data.movie.tmdb} className="underline">
                More Details
              </a>
            </div>
            <div className={styles.detailsRowContainer}>
              <div className={styles.detailsRowContainer}>
                <p className={styles.detailsStatItemRowHeader}>Genres</p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.genres.map(({ name }, key) => {
                    return (
                      <p
                        key={key}
                        className={
                          key == 0
                            ? styles.detailsStatItem
                            : styles.detailsStatItemML
                        }
                      >
                        {name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className={styles.detailsRowContainer}>
                <p className={styles.detailsStatItemRowHeader}>Cast</p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.cast.map(({ name }, key) => {
                    return (
                      <>
                        {key < 5 ? (
                          <p
                            key={key}
                            className={
                              key == 0
                                ? styles.detailsStatItem
                                : styles.detailsStatItemML
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
              <div className={styles.detailsRowContainer}>
                <p className={styles.detailsStatItemRowHeader}>Director</p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.directors.map(({ name }, key) => {
                    return (
                      <p
                        key={key}
                        className={
                          key == 0
                            ? styles.detailsStatItem
                            : styles.detailsStatItemML
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
