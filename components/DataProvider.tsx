import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  uri: "https://consumat-io-backend.herokuapp.com/",
  cache: new InMemoryCache(),
});

type DataProviderProps = {
  children: ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;

// Queries

export function useMovie(id: number) {
  const GET_MOVIE = gql`
    query getMovie($id: Int!) {
      movie(code: $id, country: "DE") {
        title
      }
    }
  `;
  return useQuery<any>(GET_MOVIE, {
    variables: { id },
  });
}
