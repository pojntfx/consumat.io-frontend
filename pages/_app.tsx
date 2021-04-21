import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apolloClient";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(
    pageProps.initialApolloState,
    process.env.API_URL
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;
