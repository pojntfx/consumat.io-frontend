import Link from "next/link";
import { imgSizes, useImage } from "../../hooks/ImageHook";
import { Result } from "../../lib/api/consumat-io";

type SearchResultItemProps = {
  searchResult: Result;
};

const SearchResultItem = ({ searchResult }: SearchResultItemProps) => {
  const image = useImage(imgSizes.poster.w154, searchResult.posterPath);

  return (
    <Link href={"/details/" + searchResult.code}>
      <div className="cursor-pointer my-2 h-29 md:h-36 rounded shadow flex flex-row overflow-hidden">
        <img className="max-h-full" src={image} />
        <div className="mx-2 my-1 md:mx-2.5 md:my-1.5 flex flex-col min-w-0 flex-shrink justify-between">
          <div>
            <h2 className="md:text-xl text-lg md:leading-7 leading-6 font-bold truncate">
              {searchResult.title}
            </h2>
            <div className="md:text-base text-sm text-gray-500 truncate">
              {searchResult.releaseDate}
            </div>
          </div>
          <div className="md:text-base text-sm line-clamp-3 md:h-line-base-3 h-line-sm-3">
            {searchResult.overview}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultItem;
