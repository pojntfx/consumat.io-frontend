import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import MetaData from "../../components/MetaData";
import { useAuthorization } from "../../hooks/AuthnHooks";
import { useGetMovie } from "../../hooks/DataHooks";
import DetailPage from "../../components/detail/DetailPage";
import Spinner from "../../components/helper/Spinner";
import ErrorMessage from "../../components/helper/ErrorMessage";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Movie = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useGetMovie(parseInt("" + id));

  if (loading) return <Spinner />;

  return (
    <div>
      <MetaData title={"consumat.io | " + data?.movie.title} />

      <DetailPage media={data?.movie} />

      {error && <ErrorMessage />}
    </div>
  );
};

export default Movie;
