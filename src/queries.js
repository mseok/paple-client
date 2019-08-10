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
    mutation authentication($email: String!, $password: String!, $name: String!) {
        authentication {
            register(email: $email, password: $password, name: $name) {
                responseResult {
                    succeeded
                    errorCode
                    message
                }
                jwt
            }
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation authentication($username: String!, $password: String!, $strategy: String!) {
        authentication {
            login(username: $username, password: $password, strategy: $strategy) {
                responseResult {
                    succeeded
                    errorCode
                    message
                }
                jwt
            }
        }
    }
`

export const PAGE_QUERY = gql`
    query Page($pageId: Int!) {
        pages {
            single(id: $pageId) {
                id
                description
                title
                render
            }
        }
    }
`

export const PAGE_LIST_QUERY = gql`
    query pageList{
        pages {
            list {
                id
                title
            }
        }
    }
`

export const PAGE_CREATE_MUTATION = gql`
    mutation pages($pageId: Int!, $content: String) {
        pages {
            update(id: $pageId, content: $content) {
                responseResult {
                    succeeded
                    errorCode
                    slug
                    message
                }
            }
        }
    }
`
