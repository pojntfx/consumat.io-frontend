export type MediaInfo = {
  description: string;
  value: string;
};

type GeneralInfoListProps = {
  infos: MediaInfo[];
  className?: string;
};

const GeneralInfoList = ({ infos, className }: GeneralInfoListProps) => {
  return (
    <div
      className={
        "px-4 pb-4 bg-gradient-to-br from-white to-white dark:from-gray-700 dark:to-gray-800 rounded shadow-md " +
        className
      }
    >
      <h3 className="cardHeading">Infos</h3>
      <div className="flex flex-row">
        {infos.map((info, index) => {
          return (
            <div className="ml-1 mr-4" key={index}>
              <h3>{info.description}</h3>
              <p>{info.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralInfoList;
