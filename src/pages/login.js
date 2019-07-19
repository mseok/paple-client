import React, { Component } from 'react';

class Login extends Component {
    gotoMain = e => {
        window.location.pathname = "/"
    }

    render() {
        return (
            <React.Fragment>
                <div> This is login page </div>
                <button onClick={this.gotoMain}>shit</button>
            </React.Fragment>
        )
    }
}

export default Login;