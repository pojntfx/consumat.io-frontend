import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Spinner from "../components/helper/Spinner";
import LibraryList from "../components/library/LibraryList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useList } from "../hooks/DataHooks";
import { WatchStatus } from "../types/status";
import { useEffect, useState } from "react";
import RadioSlider from "../components/helper/RadioSlider";
import { MediaType } from "../types/media";
import { selectHttpOptionsAndBody } from "@apollo/client";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Library = () => {
  const [session] = useAuthorization();
  if (!session) return null;

  const [medium, setMedium] = useState<MediaType>(MediaType.Movie);
  const [watchStatus, setWatchStatus] = useState<WatchStatus>();
  const [watchStati, setWatchStati] = useState<WatchStatus[]>([
    WatchStatus.Planning,
    WatchStatus.Finished,
  ]);
  const [filter, setFilter] = useState<any>();
  const [filters, setFilters] = useState<any[]>([]);

  useEffect(() => {
    switch (medium) {
      case MediaType.Movie:
        setWatchStati([WatchStatus.Planning, WatchStatus.Finished]);
        break;
      case MediaType.Tv:
        setWatchStati([
          WatchStatus.Watching,
          WatchStatus.Planning,
          WatchStatus.Dropped,
          WatchStatus.Finished,
        ]);
        break;
    }
  }, [medium]);
  useEffect(() => {
    setWatchStatus(watchStati[0]);
  }, [watchStati]);

  useEffect(() => {
    switch (medium) {
      case MediaType.Movie:
        switch (watchStatus) {
          case WatchStatus.Planning:
            setFilters([]);
            break;
          case WatchStatus.Finished:
            setFilters([]);
            break;
        }
        break;
      case MediaType.Tv:
        switch (watchStatus) {
          case WatchStatus.Watching:
            setFilters([]);
            break;
          case WatchStatus.Planning:
            setFilters([]);
            break;
          case WatchStatus.Dropped:
            setFilters([]);
            break;
          case WatchStatus.Finished:
            setFilters([]);
            break;
        }
        break;
    }
  }, [watchStatus]);
  useEffect(() => {
    setFilter(filters[0]);
  }, [watchStatus]);

  const { data, loading, error } = useList(medium, watchStatus);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Library" />

      <RadioSlider
        name="medium"
        value={medium}
        onChange={setMedium}
        options={[MediaType.Movie, MediaType.Tv]}
        className="mb-2"
      />
      <RadioSlider
        name="watchStatus"
        value={watchStatus}
        onChange={setWatchStatus}
        options={watchStati}
        className="mb-1"
      />

      <div className="flex flex-row">
        <div className="flex flex-row w-1/2">
          <select
            name="sort"
            id="sort"
            className="h-8 w-full text-sm font-semibold rounded cursor-pointer border border-gray-800; dark:text-gray-800"
          >
            <option value="">Name</option>
          </select>
        </div>
        <div className="flex flex-row w-1/2">
          <select
            name="filter"
            id="filter"
            className="h-8 w-full text-sm font-semibold rounded cursor-pointer border border-gray-800; dark:text-gray-800"
          >
            <option value="">All</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        data != null && <LibraryList mediaList={data.list} watchStatus={null} />
      )}
    </div>
  );
};

export default Library;
