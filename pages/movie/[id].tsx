import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import MetaData from "../../components/MetaData";
import { useAuthorization } from "../../hooks/AuthnHooks";
import { useMovie } from "../../hooks/DataHooks";
import styles from "../../styles/Details.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Details = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useMovie(parseInt("" + id));

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div>
        <MetaData title="consumat.io | Home" />
        <div className="relative py-8 px-4">
          <div className="z-20 relative h-96 ">
            <img
              className={styles.detailsPoster}
              src={
                "https://image.tmdb.org/t/p/original" + data.movie.posterPath
              }
            />
          </div>
          <div className="absolute inset-0 h-auto z-10">
            <img
              src={
                "https://image.tmdb.org/t/p/original" + data.movie.backdropPath
              }
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
              <p className={styles.detailsStat}>{data.movie.ratingAverage}</p>
              <p className={styles.detailsStat}>{data.movie.popularity}</p>
              <a href={data.movie.tmdbUrl} className="underline">
                More Details
              </a>
            </div>
            <div className={styles.detailsRowContainer}>
              <div className={styles.detailsRowContainer}>
                <p className={styles.detailsStatItemRowHeader}>Genres</p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.genres.map(({ name }, i) => {
                    return (
                      <p
                        key={i}
                        className={
                          i == 0
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
                  {data.movie.cast.map(({ name }, i) => {
                    return (
                      <>
                        {i < 5 && (
                          <p
                            key={i}
                            className={
                              i == 0
                                ? styles.detailsStatItem
                                : styles.detailsStatItemML
                            }
                          >
                            {name}
                          </p>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className={styles.detailsRowContainer}>
                <p className={styles.detailsStatItemRowHeader}>Director</p>
                <div className="md:ml-40 flex flex-row">
                  {data.movie.directors.map(({ name }, i) => {
                    return (
                      <p
                        key={i}
                        className={
                          i == 0
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
