import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { AUTHENTICATION_MUTATION } from '../queries';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css"

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            confirmpw: "",
        }
    }


    gotoMain = e => {
        window.location.pathname = "/"
    }
    
    render() {
        const { email, password, name, confirmpw } = this.state;
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>register</title>
                {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />*/}
                <div className="main">
                    <section className="signup">
                    <div className="border rounded-0 container-box" style={{width: '840px', margin: '0 auto', padding: '40px 60px', backgroundColor: 'white', marginTop: '100px'}}>
                    <Mutation mutation={AUTHENTICATION_MUTATION}>
                        {mutate => (
                            <div className="container" style={{width: '100%', margin: 0, position: 'relative'}}>
                                <div className="signup-content"> 
                                    <form id="signup-form" className="signup-form" method="POST">
                                        <h2 className="text-center" style={{marginTop: '20px', marginBottom: '30px'}}>Create Your Account</h2>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="name"
                                                onChange={ e => {this.setState({name: e.target.value})}}
                                                placeholder="Your Name"
                                                style={{fontFamily: 'Roboto, sans-serif'}}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                onChange={ e => {this.setState({email: e.target.value})}}
                                                placeholder="Your Email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                id="password"
                                                onChange={ e => {this.setState({password: e.target.value})}}
                                                placeholder="Your Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                id="re-password"
                                                onChange={ e => {this.setState({confirmpw: e.target.value})}}
                                                placeholder="Repeat Your Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="agreement" />
                                                <label className="form-check-label" htmlFor="formCheck-1">I agree all statements in Terms of Service</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                style={{width: '100%', padding: 0, height: '60px', backgroundColor: '#8D4B4B', borderColor: '#8D4B4B'}}
                                                onClick={async () => {
                                                    const response = await mutate({
                                                        variables: this.state
                                                    })
                                                    console.log(response);
                                                }}>
                                                    Sign Up
                                            </button>
                                        </div>
                                    </form>                              
                                </div>
                            </div>
                        )}
                        </Mutation>
                    </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Signup;