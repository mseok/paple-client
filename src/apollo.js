import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import Cookies from 'js-cookie';

const client = new ApolloClient({
    link: new HttpLink({
        uri : "http://localhost:3000/graphql",
        connectToDevTools: true,
        // includeExtensions: true,
        // credentials: "include",
    }),
    // request: async operation => {
    //     const token = localStorage.getItem('token');
    //     operation.setContext({
    //       headers: {
    //         authorization: token ? `Bearer ${token}` : ''
    //       }
    //     });
    // },
    cache: new InMemoryCache()
});

export default client;