type DetailInfoListProps = {
  title: string;
  infos: string[];
};

const DetailInfoList = ({ title, infos }: DetailInfoListProps) => {
  return (
    <div className="my-8 px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md">
      <h3 className="inline-block -mt-3 mb-3 h-8 leading-8 px-2 rounded bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow">
        {title}
      </h3>
      <div>
        {infos.map((info, index) => {
          return (
            <div
              key={index}
              className="inline-block mr-1 mb-1 p-2 bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded"
            >
              {info}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailInfoList;
