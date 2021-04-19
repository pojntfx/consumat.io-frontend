import MetaData from "../components/MetaData";

const Details = () => {
  return (
    <div>
      <MetaData title="consumat.io | Home" />
      <div className="w-screen h-screen flex flex-row flex-wrap">
        <div className="w-screen w-2/3 relative">
          <img
            className="h-4/5 2xl:h-3/5 w-screen md:object-cover object-fill"
            src="https://ninotaku.de/wp-content/uploads/2020/12/gintama-1.jpg"
          />
          <img
            className="rounded-lg shadow-lg w-48  lg:w-64 antialiased absolute top-96 left-20 lg:left-12"
            src="https://i.pinimg.com/236x/5c/e7/97/5ce7972ccf38c44ff01b79d5227d462a.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
