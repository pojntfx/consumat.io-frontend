import { Dispatch, SetStateAction } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";

type PaginationBarProps = {
  page: number;
  maxPages?: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const PaginationBar = ({ page, maxPages, setPage }: PaginationBarProps) => {
  return (
    <div className="flex mt-6 justify-center items-center">
      <button onClick={() => page > 1 && setPage(page - 1)}>
        <ArrowCircleLeftIcon className="h-8 w-8" />
      </button>
      <p className="font-bold mx-1">
        {page}
        {maxPages && `/${maxPages}`}
      </p>
      <button onClick={() => page < maxPages && setPage(page + 1)}>
        <ArrowCircleRightIcon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default PaginationBar;
