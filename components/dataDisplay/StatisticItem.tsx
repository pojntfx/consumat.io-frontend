type StatistikItemProps = {
  title: string;
  times: number | string;
};

const StatistikItem = ({ title, times }: StatistikItemProps) => {
  return (
    <div className="flex flex-row items-center">
      <h3 className="mr-2">{title}</h3> <p className="ml-auto">{times}</p>
    </div>
  );
};

export default StatistikItem;
