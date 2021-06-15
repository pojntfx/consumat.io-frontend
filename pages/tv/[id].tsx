import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import MetaData from "../../components/MetaData";
import { useAuthorization } from "../../hooks/AuthnHooks";
import { useGetTv } from "../../hooks/DataHooks";
import DetailPage from "../../components/detail/DetailPage";
import Spinner from "../../components/feedback/Spinner";
import ErrorMessage from "../../components/feedback/ErrorMessage";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Tv = () => {
  const [session] = useAuthorization();

  if (!session) return null;

  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useGetTv(parseInt("" + id));

  if (loading) return <Spinner />;

  return (
    <div>
      <MetaData title={"consumat.io | " + data?.tv.title} />

      <DetailPage media={data?.tv} />

      {error && <ErrorMessage />}
    </div>
  );
};

export default Tv;
