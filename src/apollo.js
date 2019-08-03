import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import Cookies from "js-cookie";

const client = new ApolloClient({
    link: new HttpLink({
        uri : "http://localhost:3000/graphql",
        connectToDevTools: true,
        request: async (operation) => {
            const token = Cookies.get('token');
            operation.setContext({
                headers: {
                    authorization: `Bearer $(token)`,
                }
            })
        }
    }),
    cache: new InMemoryCache()
});

export default client;