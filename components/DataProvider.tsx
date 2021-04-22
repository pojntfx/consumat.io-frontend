import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { ReactNode } from "react";
import getMovie from "../api/queries/getMovie.graphql";

const client = new ApolloClient({
  uri: "https://consumat-io-backend.herokuapp.com/",
  cache: new InMemoryCache(),
});

type DataProviderProps = {
  children?: ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;

// Queries

export function useMovie(id: number) {
  return useQuery<any>(getMovie, {
    variables: { id },
  });
}
