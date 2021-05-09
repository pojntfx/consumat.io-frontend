import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useApollo } from "../lib/apolloClient";
import { Provider } from "next-auth/client";
import { useState } from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [defaultLayout, setDefaultLayout] = useState("default");
  const apolloClient = useApollo(
    pageProps.initialApolloState,
    process.env.PROXIED_API_URL
  );

  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Layout defaultLayout={defaultLayout}>
          <Component {...pageProps} setDefaultLayout={setDefaultLayout} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
