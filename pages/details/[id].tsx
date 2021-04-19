import MetaData from "../../components/MetaData";
import { useRouter } from "next/router";

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
    <div>
      <MetaData title="consumat.io | Home" />
      <div className="w-screen h-screen flex-wrap">
        <div className="w-screen w-2/3 half-screen relative">
          <img className="details-banner" src={bannerImage} />
          <div className="w-auto h-auto flex flex-col sm:flex-row items-center absolute  xl:bottom-20 xl:left-12 2xl:bottom-48 2xl:left-12">
            <img className="details-poster" src={posterImage} />
            <div className="flex flex-col">
              <h1 className="text-center sm:text-left sm:ml-10 mb-10 text-black sm:px-0 sm:text-white text-8xl">
                {title}
              </h1>
              <p className="px-8 sm:ml-10 text-black text-2xl">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
