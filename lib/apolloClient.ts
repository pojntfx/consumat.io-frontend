import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<any> | undefined;

function createApolloClient(uri: string) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createHttpLink({
      uri,
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, uri: string) {
  const _apolloClient = apolloClient ?? createApolloClient(uri);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any, uri: string) {
  const store = useMemo(() => initializeApollo(initialState, uri), [
    initialState,
  ]);

  return store;
}
