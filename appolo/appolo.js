import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://hasura.dev.cryptuoso.com/v1/graphql",
  cache: new InMemoryCache(),
});

export default client;
