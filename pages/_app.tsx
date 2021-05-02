import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apolloClient";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(
    pageProps.initialApolloState,
    process.env.API_URL
  );

  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
