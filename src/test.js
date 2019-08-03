import React, { Component } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { Query, Mutation } from 'react-apollo';
import { AUTHENTICATION, AUTHENTICATION_MUTATION } from './queries';

class Test extends Component {
    state = {
        email: "",
        password: "",
        name: "",
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleClick = async e => {
        // const jwtCookie = Cookies.get('jwt')
        // if (jwtCookie) {
        //     try {
        //         const jwtData = jwt.decode(jwtCookie)
        //         console.log(jwtData)
        //     } catch (err) {
        //         console.debug('Invalid JWT. Silent authentication skipped.')
        //     }
        // }
        const ab = {
            "a" : 1,
            "b" : 2
        }
        for (var [key, value] of Object.entries(ab)) {
            console.log(key, value)
        }
    }
    
    render() {
        return (
            <div onClick={this.handleClick}>
                Shit
            </div>
                // <Query query={AUTHENTICATION}>
                // {({ loading, data, error }) => {
                //     if (loading) return "loading"
                //     if (error) return "something happened"
                //     return data.authentication.strategies.map(auth => <h2>{auth.description}</h2>)
                // }}
                // </Query>
        )
    }
}

{/* <Mutation
    mutation={AUTHENTICATION_MUTATION}
    variables={{ email, password, name }}
>
    {mutation => (
        <button onClick={mutation}>Register</button>
    )}
</Mutation> */}

{/* Get data from server with graphql */}


export default Test;