import Head from 'next/head';

const MetaData = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      {/* <link rel='icon' href='/favicon.ico' /> */}
      <title>{title}</title>
    </Head>
  )
}

MetaData.defaultProps = {
  title: 'consumat.io',
  keywords: 'series tracker, movie tracker, media tracker, media consumption tracker',
  description: 'Track, plan and enjoy content.'
}

export default MetaData
