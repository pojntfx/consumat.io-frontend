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

  return (
    <li>
      <Link href={"/details/" + searchResult.code}>
        <a>
          <div className="card flex flex-row overflow-hidden mb-3 bg-white cursor-pointer rounded">
            <MediaImage className={styles.poster} imageSrc={image} />
            <div className="flex flex-col justify-between flex-shrink mx-2 my-1 md:mx-2.5 md:my-1.5 min-w-0 ">
              <div>
                <h3 className="md:text-xl text-lg md:leading-7 leading-6 font-bold truncate">
                  {searchResult.title}
                </h3>
                <div className="md:text-base text-sm text-gray-500 truncate">
                  {searchResult.releaseDate}
                </div>
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
