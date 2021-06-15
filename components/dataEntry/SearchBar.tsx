import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

type SearchBarProps = {
  className?: string;
};

function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState<string>("");

  return (
    <div className={className}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push({ pathname: "/search", query: { q: query } }, undefined, {
            shallow: true,
          });
        }}
        autoComplete="off"
      >
        <div className="relative flex flex-row">
          <input
            type="search"
            name="q"
            placeholder="Search"
            required
            onChange={(event) => setQuery(event.target.value)}
            className="rounded w-full py-2 pl-4 pr-10 ring-1 ring-inset ring-gray-500 bg-white dark:bg-gray-700"
          />
          <button type="submit" className="absolute right-0 top-0 my-2 mr-3">
            <SearchIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
