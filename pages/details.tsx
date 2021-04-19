import MetaData from "../components/MetaData";

const Details = () => {
  return (
    <div>
      <MetaData title="consumat.io | Home" />

      <div className="w-screen h-screen flex flex-row flex-wrap bg-red-900">
        <div className="w-screen w-2/3 ">
          <img
            className="h-screen"
            src="https://img.17qq.com/images/hrscswawtcx.jpeg"
          />
          <div className="md:w-1/3 w-full">
            <img
              className="rounded-lg shadow-lg antialiased"
              src="https://i.pinimg.com/236x/5c/e7/97/5ce7972ccf38c44ff01b79d5227d462a.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
