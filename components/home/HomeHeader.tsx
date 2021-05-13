import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";

type HomeHeaderProps = {
  backgroundImageSource: string;
};

const HomeHeader = ({ backgroundImageSource }: HomeHeaderProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-500 w-full h-64 sm:h-96 -mt-4 rounded-b shadow-md"
      style={{
        background: `linear-gradient(0deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.8)), url(${useImage(
          imageSizes.backdrop.w1280,
          backgroundImageSource
        )})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-4/5">
        <h2 className="text-white text-xl leading-5 sm:text-3xl sm:leading-8">
          Track. Plan. Enjoy Content.
        </h2>
        <h2 className="text-white text-xl leading-5 sm:text-3xl sm:leading-8 mb-4">
          Find your new favorite media right now.
        </h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push({ pathname: "/search", query: { q: query } });
          }}
          autoComplete="off"
        >
          <div className="flex">
            <input
              type="search"
              name="q"
              placeholder="Search..."
              aria-label="Search"
              required
              onChange={(event) => setQuery(event.target.value)}
              className="p-2 rounded-l w-full mr-0.5"
            />
            <button type="submit" className="px-4 py-2 rounded-r">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeHeader;
