import { ApolloClient, InMemoryCache } from "@apollo/client";

const GQLClient = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined"
});

export default GQLClient;
