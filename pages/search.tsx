import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/feedback/Spinner";
import ErrorMessage from "../components/feedback/ErrorMessage";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useGetSearch } from "../hooks/DataHooks";
import MediaCardList from "../components/mediaCard/MediaCardList";
import SearchBar from "../components/dataEntry/SearchBar";
import {
  EmojiSadIcon,
  BanIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import { Media } from "../lib/api/consumat-io";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Search = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const router = useRouter();

  // search results
  const [searchResults, setSearchResults] = useState<Media[]>([]);

  // set default query if empty
  useEffect(() => {
    if (JSON.stringify(router.query) === "{}")
      router.push({ query: { q: null } }, undefined, { shallow: true });
  }, []);

  // get url query
  const { q: keyword } = router.query;

  // pagination
  const [searchPage, setSearchPage] = useState<number>(1);
  // - set page to 1 and empty search results if the keyword changes
  const [lastKeyword, setLastKeyword] = useState<string>();
  useEffect(() => {
    if (keyword + "" != lastKeyword) {
      setLastKeyword(keyword + "");
      setSearchPage(1);
      setSearchResults([]);
    }
  }, [keyword]);

  // get search results for one page
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useGetSearch(keyword, searchPage);

  // update search results
  useEffect(() => {
    if (searchData && !searchLoading && !searchError) {
      setSearchResults(
        [...searchResults, ...searchData.search.results].filter(
          (result, index, self) => {
            return (
              self.findIndex((x) => {
                return (
                  x.__typename === result.__typename && x.code === result.code
                );
              }) === index
            );
          }
        )
      );
    }
  }, [searchData]);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Search" />
      <SearchBar className="mb-3" />
      {searchError && <ErrorMessage />}
      {(searchData || searchLoading) && (
        <>
          <MediaCardList mediaList={searchResults} />
          <div className="flex justify-center mb-3">
            {searchLoading ? (
              <Spinner className="h-10 items-center" />
            ) : searchResults.length == 0 ? (
              <div className="card flex flex-row py-2 px-4 truncate">
                <EmojiSadIcon className="h-6 w-6 mr-2 flex-shrink-0" />
                <div className="mr-2 font-medium">No results for:</div>
                <div className="italic">{`${keyword}`}</div>
              </div>
            ) : searchPage < searchData.search.totalPages ? (
              <button
                onClick={() => setSearchPage(searchPage + 1)}
                className="button buttonStandard my-1"
              >
                <ArrowCircleDownIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
                <div>Load more results ...</div>
              </button>
            ) : (
              <div className="card buttonStandard my-1 text-gray-500">
                <BanIcon className="h-6 w-6 mr-1 -my-0.5 flex-shrink-0" />
                <div>No more results</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
