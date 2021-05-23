type DetailInfoListProps = {
  title: string;
  infos: string[];
};

const DetailInfoList = ({ title, infos }: DetailInfoListProps) => {
  return (
    infos.length > 0 && (
      <div className="cardWithShadow">
        <h3 className="cardHeading">{title}</h3>
        <div>
          {infos.map((info, index) => {
            return (
              <div
                key={index}
                className="inline-block mr-1 mb-1 p-2 bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded shadow"
              >
                {info}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default DetailInfoList;
