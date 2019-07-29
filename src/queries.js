import gql from "graphql-tag";

export const AUTHENTICATION = gql`
    {
        authentication {
            strategies(isEnabled: true) {
                title
                description
            }
        }
    }
`

export const AUTHENTICATION_MUTATION = gql`
    mutation authentication($email: String!, $password: String!, $name: String!){
        register(email: $email, password: $password, name: $name) {
            jwt
            responseResult {
                succeeded
                errorCode
            }
        }
    }
`