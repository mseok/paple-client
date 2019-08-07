import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
    link: new HttpLink({
        uri : "http://localhost:3000/graphql",
        connectToDevTools: true,
    }),
    cache: new InMemoryCache()
});

export default client;