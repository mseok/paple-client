import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri : "http://localhost:3000/graphql",
    connectToDevTools: true
});

export default client;