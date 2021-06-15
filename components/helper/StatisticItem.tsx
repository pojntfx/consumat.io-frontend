type StatistikItemProps = {
  title: string;
  times: number | string;
};

const StatistikItem = ({ title, times }: StatistikItemProps) => {
  return (
    <div className="flex flex-row items-center">
      <h3>{title}</h3> <p className="ml-2">{times}</p>
    </div>
  );
};

export default StatistikItem;
