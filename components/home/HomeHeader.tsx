import { useRouter } from "next/router";
import { useState } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import SearchBar from "../dataEntry/SearchBar";

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
        backgroundImage: `linear-gradient(0deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.8))${
          backgroundImageSource &&
          `, url(${useImage(imageSizes.backdrop.w1280, backgroundImageSource)}`
        })`,
        backgroundColor: `${!backgroundImageSource && "rgba(31, 41, 55, 0.8)"}`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-4/5">
        <h2
          className="text-white text-xl leading-5 sm:text-3xl sm:leading-8"
          style={{ textShadow: "2px 2px 2px rgba(31, 41, 55)" }}
        >
          Track. Plan. Enjoy Content.
        </h2>
        <h2
          className="text-white text-xl leading-5 sm:text-3xl sm:leading-8 mb-4"
          style={{ textShadow: "2px 2px 2px rgba(31, 41, 55)" }}
        >
          Find your new favorite media right now.
        </h2>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomeHeader;
