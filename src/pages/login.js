import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from '../queries';
import Cookies from 'js-cookie';
import _ from 'lodash';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import logo from "../assets/img/logo3.png";

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            strategy: "local",
            success: false,
        }
    }

    gotoMain = e => {
        window.location.pathname = "/"
    }

    render() {
        const { email, username, password, strategy } = this.state;
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>login</title>
                {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Gugi" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nanum+Gothic" />*/}
                <div className="wrap">
                    <div className="header" style={{paddingTop: '132px', width: '1024px', margin: '0 auto'}}>
                    <h1>
                        <img src={logo} style={{margin: '0 auto', cursor: 'pointer', display: "-webkit-box"}} onClick={this.gotoMain}/>
                    </h1>
                    </div>
                    <div className="container" style={{width: '1024px'}}>
                        <div className="content" style={{width: '720px', margin: '0 auto', paddingBottom: '120px'}}>
                            <Mutation mutation={LOGIN_MUTATION}>
                                {mutate => (
                                <form id="login">
                                    <fieldset className="login_form">
                                        <legend className="blind" />
                                        <div className="id_area">
                                            <div className="border rounded-0 input-row" id="id-area" style={{height: '50px', marginBottom: '14px', paddingTop: '5px', paddingRight: '10px', paddingBottom: '10px', paddingLeft: '10px'}}>
                                                <input
                                                    className="form-control"
                                                    autoComplete="off"
                                                    refs="id"
                                                    type="text"
                                                    id="id"
                                                    placeholder="Your Email"
                                                    onChange={ e => this.setState({username: e.target.value})}
                                                    onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('submit').click()}} }
                                                    autoFocus
                                                    style={{border: '0px', paddingTop: '0px', paddingRight: '0px', paddingBottom: '5px', paddingLeft: '0px'}}
                                                />
                                            </div>
                                            <div className="border rounded-0 input-row" id="password-area" style={{height: '50px', marginBottom: '14px', paddingTop: '5px', paddingRight: '10px', paddingBottom: '10px', paddingLeft: '10px'}}>
                                                <input
                                                    className="form-control"
                                                    refs="password"
                                                    type="password"
                                                    id="password"
                                                    placeholder="Your Password"
                                                    onChange={ e => this.setState({password: e.target.value})}
                                                    onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('submit').click()}} }
                                                    style={{border: '0px', paddingTop: '0px', paddingRight: '0px', paddingBottom: '5px', paddingLeft: '0px'}}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            id="submit"
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={async () => {
                                                const response = await mutate({
                                                    variables: { username, password, strategy }
                                                })
                                                console.log(response.data.authentication)
                                                if (_.has(response, 'data.authentication.login')) {
                                                    let respObj = _.get(response, 'data.authentication.login', {})
                                                    if (respObj.responseResult.succeeded === true) {
                                                        Cookies.set('jwt', respObj.jwt, { expires: 365 })                                                        
                                                        _.delay(() => {
                                                            window.location.replace('/')
                                                        }, 1000)
                                                        return true
                                                    } else {
                                                        throw new Error(respObj.responseResult.message)
                                                    }
                                                }
                                            }}
                                            style={{width: '100%', marginTop: '30px', marginBottom: '50px', height: '70px', fontFamily: '"Nanum Gothic", sans-serif', fontSize: '25px', letterSpacing: '2px', backgroundColor: '#8D4B4B', borderColor: '#8D4B4B'}}
                                        >
                                            로그인
                                        </button>
                                    </fieldset>
                                </form>
                                )}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;