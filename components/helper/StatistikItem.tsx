type StatistikItemProps = {
  title: string;
  times: number;
};

const StatistikItem = ({ title, times }: StatistikItemProps) => {
  return (
    <div className="flex flex-row">
      <h3>{title}</h3> <p className="ml-2">{times}</p>
    </div>
  );
};

export default StatistikItem;
