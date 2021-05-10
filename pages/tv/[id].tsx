import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Spinner from "../../components/helper/Spinner";
import MetaData from "../../components/MetaData";
import { useAuthorization } from "../../hooks/AuthnHooks";
import { useTv } from "../../hooks/DataHooks";
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
  const { data, loading } = useTv(parseInt("" + id));

  if (loading) return <Spinner />;

  return (
    <>
      <MetaData title="consumat.io | Home" />
      <div className={styles.detailsBackdropCon}>
        <img
          className={styles.detailsBackdrop}
          src={"https://image.tmdb.org/t/p/original" + data.tv.backdropPath}
        />
      </div>
      <div className={styles.posterTitleDescriptionRow}>
        <img
          className={styles.detailsPoster}
          src={"https://image.tmdb.org/t/p/original" + data.tv.posterPath}
        />
        <div className={styles.titleDescriptionContainer}>
          <h1 className={styles.title}>{data.tv.title}</h1>
          <p className={styles.description}>{data.tv.overview}</p>
        </div>
      </div>
      <div className={styles.infoCard}>
        <div className="flex flex-row justify-between">
          <p className="text-sm truncate rounded font-bold">Release Date: </p>
          <p className="text-sm truncate rounded">{data.tv.releaseInitial}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-sm truncate rounded font-bold">Rating Average: </p>
          <p className="text-sm truncate rounded">{data.tv.ratingAverage}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-sm truncate rounded font-bold">Popularity: </p>
          <p className="text-sm truncate rounded">{data.tv.popularity}</p>
        </div>
        <a
          href={data.tv.tmdbUrl}
          className="text-sm truncate rounded underline"
        >
          More Details
        </a>
      </div>
    </>
  );
};

export default Details;
