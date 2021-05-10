import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import MetaData from "../../components/MetaData";
import { useAuthorization } from "../../hooks/AuthnHooks";
import { useMovie } from "../../hooks/DataHooks";
import { useEffect } from "react";
import styles from "../../styles/Details.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Details = ({ setDefaultLayout }) => {
  const [session] = useAuthorization();
  useEffect(() => {
    setDefaultLayout("notDefault");
  }, []);

  if (!session) return null;

  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useMovie(parseInt("" + id));

  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className={styles.detailsBackdropCon}>
        <img
          className={styles.detailsBackdrop}
          src={"https://image.tmdb.org/t/p/original" + data.movie.backdropPath}
        />
      </div>
      <div className={styles.posterTitleDescriptionRow}>
        <img
          className={styles.detailsPoster}
          src={"https://image.tmdb.org/t/p/original" + data.movie.posterPath}
        />
        <div className={styles.titleDescriptionContainer}>
          <h1 className={styles.title}>{data.movie.title}</h1>
          <p className={styles.description}>{data.movie.overview}</p>
        </div>
      </div>

      <div className={styles.infoCardCon}>
        <div className={styles.infoCard}>
          <div className="flex flex-row justify-between">
            <p className="text-sm truncate rounded font-bold">Release Date: </p>
            <p className="text-sm truncate rounded">
              {data.movie.releaseInitial}
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-sm truncate rounded font-bold">
              Rating Average:{" "}
            </p>
            <p className="text-sm truncate rounded">
              {data.movie.ratingAverage}
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-sm truncate rounded font-bold">Popularity: </p>
            <p className="text-sm truncate rounded">{data.movie.popularity}</p>
          </div>
          <a
            href={data.movie.tmdbUrl}
            className="text-sm truncate rounded underline"
          >
            More Details
          </a>
        </div>

        <div className={styles.infoCardTwo}>
          <p className="text-sm truncate rounded font-bold">Genres: </p>
          <div className="flex flex-row justify-between">
            {data.movie.genres.map(({ name }, key) => {
              return (
                <>
                  {key < 3 ? (
                    <p key={key} className="text-sm truncate rounded">
                      {name}
                    </p>
                  ) : (
                    <> </>
                  )}
                </>
              );
            })}
          </div>
          <p className="text-sm truncate rounded font-bold">Cast: </p>
          <div className="flex flex-row justify-between">
            {data.movie.cast.map(({ name }, key) => {
              return (
                <>
                  {key < 3 ? (
                    <p key={key} className="text-sm truncate rounded">
                      {name}
                    </p>
                  ) : (
                    <> </>
                  )}
                </>
              );
            })}
          </div>
          <p className="text-sm truncate rounded font-bold">Directors: </p>
          <div className="flex flex-row justify-between">
            {data.movie.directors.map(({ name }, key) => {
              return (
                <p key={key} className="text-sm truncate rounded">
                  {name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
