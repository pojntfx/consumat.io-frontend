import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Spinner from "../components/helper/Spinner";
import LibraryList from "../components/library/LibraryList";
import MetaData from "../components/MetaData";
import { useAuthorization } from "../hooks/AuthnHooks";
import { useGetList } from "../hooks/DataHooks";
import {
  getValidWatchStatusForMediaType,
  getWatchStatusFromString,
  WatchStatus,
} from "../types/status";
import { useEffect, useState } from "react";
import RadioSlider from "../components/helper/RadioSlider";
import { getMediaTypeFromString, MediaType } from "../types/media";
import ErrorMessage from "../components/helper/ErrorMessage";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { session: await getSession(context) },
});

const Library = () => {
  // authorization
  const [session] = useAuthorization();
  if (!session) return null;

  // query setup
  const router = useRouter();

  function submit(media: MediaType, watchStatus: WatchStatus) {
    router.push(
      { query: { media: media, watchStatus: watchStatus } },
      undefined,
      { shallow: true }
    );
  }

  // set default query if empty
  useEffect(() => {
    if (JSON.stringify(router.query) === "{}")
      router.push(
        { query: { media: "TV", watchStatus: "Watching" } },
        undefined,
        { shallow: true }
      );
  }, []);

  // get query parameters and updates states
  const { media, watchStatus } = router.query;

  const [mediaActive, setMediaActive] = useState<MediaType>();
  const [watchStatusActive, setWatchStatusActive] = useState<WatchStatus>();

  useEffect(() => {
    setMediaActive(getMediaTypeFromString(media + ""));
    setWatchStatusActive(getWatchStatusFromString(watchStatus + ""));
  }, [media, watchStatus]);

  // update state options
  const [watchStatusOptions, setWatchStatusOptions] = useState<WatchStatus[]>(
    []
  );
  useEffect(() => {
    setWatchStatusOptions(getValidWatchStatusForMediaType(mediaActive));
  }, [mediaActive]);

  // get list
  const { data, loading, error } = useGetList(mediaActive, watchStatusActive);
  useEffect(() => {
    if (data != null) {
      console.log(mediaActive + " " + watchStatusActive);
      console.log(data.list);
    }
  }, [data]);

  return (
    <div className="px-4">
      <MetaData title="consumat.io | Library" />

      <div className="mb-3">
        <RadioSlider
          name="medium"
          value={mediaActive}
          options={[MediaType.Tv, MediaType.Movie]}
          onChange={(event) => {
            if (event.target.value == MediaType.Movie) {
              submit(
                getMediaTypeFromString(event.target.value),
                WatchStatus.Planning
              );
            } else {
              submit(
                getMediaTypeFromString(event.target.value),
                WatchStatus.Watching
              );
            }
          }}
          className="mb-4"
        />
        <RadioSlider
          name="watchStatus"
          value={watchStatusActive}
          options={watchStatusOptions}
          onChange={(event) => {
            submit(mediaActive, getWatchStatusFromString(event.target.value));
          }}
          className="mb-1"
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        data != null && (
          <LibraryList mediaList={data.list} watchStatus={watchStatusActive} />
        )
      )}

      {error && <ErrorMessage />}
    </div>
  );
};

export default Library;
