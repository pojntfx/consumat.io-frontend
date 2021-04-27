type MediumCardProps = {
  key: number;
  title: string;
  imgSrc: string;
};

const MediumCard = ({ key, title, imgSrc }: MediumCardProps) => {
  return (
    <div className="place-self-center w-36 flex flex-col items-center justify-center cursor-pointer">
      <img src={imgSrc} alt={`${title} poster`} className="rounded" />
      <p className="self-start font-semibold">{title}</p>
    </div>
  );
};

export default MediumCard;
