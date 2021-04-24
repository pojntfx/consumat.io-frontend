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
      </div>
    </>
  );
};

export default Details;
