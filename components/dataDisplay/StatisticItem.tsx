import LoadingDots from "../feedback/LoadingDots";

type StatistikItemProps = {
  title: string;
  times: number | string;
  loading: boolean;
};

const StatistikItem = ({ title, times, loading }: StatistikItemProps) => {
  return (
    <>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="flex flex-row items-center">
          <h3 className="mr-2">{title}</h3> <p className="ml-auto">{times}</p>
        </div>
      )}
    </>
  );
};

export default StatistikItem;
