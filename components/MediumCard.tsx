type MediumCardProps = {
  key: number;
  title: string;
  imgSrc: string;
};

const MediumCard = ({ title, imgSrc }: MediumCardProps) => {
  return (
    <div className="place-self-center w-32 flex flex-col items-center justify-center rounded bg-white shadow cursor-pointer hover:shadow-md duration-75">
      <img
        src={imgSrc}
        alt={`${title} poster`}
        className="object-fill w-full rounded-t"
      />
      <p className="self-start text-sm py-1 px-2 truncate w-full">{title}</p>
    </div>
  );
};

export default MediumCard;
