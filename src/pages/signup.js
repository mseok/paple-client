import React, { Component } from 'react';

class Signup extends Component {
    gotoMain = e => {
        window.location.pathname = "/"
    }
    
    render() {
        return (
            <React.Fragment>
                <div> This is signup page </div>
                <button onClick={this.gotoMain}>shit</button>
            </React.Fragment>
        )
    }
}

export default Signup;