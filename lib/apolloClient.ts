import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { SESSION_TOKEN_COOKIE_NAME } from "../constants/authn";

let apolloClient: ApolloClient<any> | undefined;

function createApolloClient(uri: string) {
  const httpLink = createHttpLink({
    uri,
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get(SESSION_TOKEN_COOKIE_NAME);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
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
