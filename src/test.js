import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { AUTHENTICATION, AUTHENTICATION_MUTATION } from './queries';

class Test extends Component {
    state = {
        email: "",
        password: "",
        name: "",
    }
    
    render() {
        const { email, password, name } = this.state;
        return ( 
            <div>
                {/* Send data to server with graphql */}
                <input
                    value={email}
                    onChange={e => this.setState({
                        email: e.target.value
                    })}
                    type="text"
                    placeholder="Your email address"
                >
                </input>
                <input
                    value={password}
                    onChange={e => this.setState({
                        password: e.target.value
                    })}
                    type="password"
                    placeholder="Choose a safe password"
                >
                </input>
                <input
                    value={name}
                    onChange={e => this.setState({
                        name: e.target.value
                    })}
                    type="text"
                    placeholder="Your name"
                >
                </input>
                <Mutation
                    mutation={AUTHENTICATION_MUTATION}
                    variables={{ email, password, name }}
                >
                    {mutation => (
                        <button onClick={mutation}>Register</button>
                    )}
                </Mutation>

                {/* Get data from server with graphql */}
                <Query query={AUTHENTICATION}>
                    {({ loading, data, error }) => {
                        if (loading) return "loading"
                        if (error) return "something happened"
                        return data.authentication.strategies.map(auth => <h2>{auth.description}</h2>)
                    }}
                </Query>
            </div>
        )
    }
}
    

export default Test;