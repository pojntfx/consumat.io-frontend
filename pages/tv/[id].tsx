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
      <div className={styles.testBanner}>
        <img
          className={styles.detailsBackdrop}
          src={"https://image.tmdb.org/t/p/original" + data.tv.backdropPath}
        />
      </div>
    </>
  );
};

export default Details;
