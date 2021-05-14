import Head from "next/head";

type MetaDataProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

const MetaData = ({
  title = "consumat.io",
  keywords = "series tracker, movie tracker, media tracker, media consumption tracker",
  description = "Track, plan and enjoy content.",
}: MetaDataProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#F9FAFB" />
      <meta name="apple-mobile-web-app-status-bar" content="#F9FAFB" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json"></link>
      <title>{title}</title>
    </Head>
  );
};

export default MetaData;
