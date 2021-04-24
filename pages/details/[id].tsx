import MetaData from "../../components/MetaData";
import { useRouter } from "next/router";
import { useMovie } from "../../hooks/DataHooks";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const title = "Gintama";
  const description =
    "Gintama is the best Anime of all time 11/10, best comedy, best animation, best fights, great characters! Gintama is the best Anime of all time 11/10, best comedy, best animation, best fights, great characters! Gintama is the best Anime of all time 11/10, best comedy, best animation, best fights, great characters! Gintama is the best Anime of all time 11/10, best comedy, best animation, best fights, great characters! Gintama is the best Anime of all time 11/10, best comedy, best animation, best fights, great characters!";
  const bannerImage =
    "https://ninotaku.de/wp-content/uploads/2020/12/gintama-1.jpg";
  const posterImage =
    "https://i.pinimg.com/236x/5c/e7/97/5ce7972ccf38c44ff01b79d5227d462a.jpg";

  return (
    <>
      <div>
        <MetaData title="consumat.io | Home" />
        <div className="relative py-8 px-4">
          <div className="z-20 relative h-96 ">
            <img
              className="details-poster top-48 ml-16 xl:ml-10 absolute"
              src={posterImage}
            />
          </div>
          <div className="absolute inset-0 h-auto z-10">
            <img src={bannerImage} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="z-40 flex flex-col absolute md:left-72 md:top-96">
          <h1 className="text-center sm:text-left sm:ml-10 mb-10 text-black sm:px-0 sm:text-white text-8xl 2xl:bottom-0 mt-24 md:mt-10">
            {title}
          </h1>
          <p className="sm:ml-10 text-black text-2xl">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
