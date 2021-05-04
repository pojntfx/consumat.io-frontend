import Link from "next/link";
import { useState } from "react";
import { imageSizes, useImage } from "../../hooks/ImageHook";
import { Result } from "../../lib/api/consumat-io";
import styles from "../../styles/Search.module.css";
import MediaImage from "../helper/MediaImage";

type SearchResultItemProps = {
  searchResult: Result;
};

const SearchResultItem = ({ searchResult }: SearchResultItemProps) => {
  const image = useImage(imageSizes.poster.w154, searchResult.posterPath);

  // mx-2 my-1 md:mx-2.5 md:my-1.5

  return (
    <li>
      <Link href={"/details/" + searchResult.code}>
        <a>
          <div className="relative card flex flex-row overflow-hidden mb-3 cursor-pointer rounded">
            <div
              className={`absolute shadow bottom-2 md:bottom-3 rounded-r text-xs md:text-sm px-1 py-0.5 md:px-1.5
                ${
                  searchResult.mediaType == "movie"
                    ? "text-white bg-red-700"
                    : "text-white bg-blue-700"
                }`}
            >
              {searchResult.mediaType == "movie" ? "Movie" : "TV Series"}
            </div>

            <MediaImage className={styles.poster} imageSrc={image} />
            <div className="flex flex-col justify-between flex-shrink min-w-0 w-full mx-1.5 my-1.5 md:mx-2 md:my-1.5">
              <h3 className="md:text-xl text-lg md:leading-6 leading-5 font-bold truncate">
                {searchResult.title}
              </h3>

              <div className="md:text-base text-sm text-gray-500 truncate">
                {searchResult.releaseDate}
              </div>

              <div className="md:text-base text-sm line-clamp-3 md:h-line-base-3 h-line-sm-3">
                {searchResult.overview}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SearchResultItem;
