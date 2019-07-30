import React, { Component } from 'react';
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
    
    render() {
        const { email, password, name } = this.state;
        return (
            <div>
                <Mutation mutation={AUTHENTICATION_MUTATION}>
                {mutate => (
                    <div>
                        {/* Send data to server with graphql */}
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="email"
                        >
                        </input>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="password"
                        >
                        </input>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="name"
                        >
                        </input>
                        <button onClick={async () => {
                            const response = await mutate({
                                variables: this.state
                            })
                            console.log(response);
                        }}>register</button>
                    </div>
                    )}
                </Mutation>
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