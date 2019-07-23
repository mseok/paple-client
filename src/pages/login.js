import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import logo from "../assets/img/logo3.png"

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.showLabel = this.showLabel.bind(this);
        this.state = {
            idData: "",
            pwData: "",
        }
    }

    gotoMain = e => {
        window.location.pathname = "/"
    }

    showLabel = e => {
        let inputId = e.target.id;
        let inputData = e.target.value;
        let labelId;
        let that = this;
        
        new Promise(function(resolve, reject) {
            if (inputId === "id") {
                labelId = "label_id-area"
                resolve()
            } else if (inputId === "password") {
                labelId = "label_password-area"
                resolve()
            }
        }).then(function() {
            if (inputData !== "") {
                window.document.getElementById(labelId).style.display = "none";
            } else {
                window.document.getElementById(labelId).style.display = "block";
            }
        })
    }

    render() {
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
                        <img src={logo} style={{margin: '0 auto', cursor: 'pointer'}} onClick={this.gotoMain}/>
                    </h1>
                    </div>
                    <div className="container" style={{width: '1024px'}}>
                        <div className="content" style={{width: '720px', margin: '0 auto', paddingBottom: '120px'}}>
                            <form id="login">
                                <fieldset className="login_form">
                                    <legend className="blind" />
                                    <div className="id_area">
                                        <div className="border rounded-0 input-row" id="id-area" style={{height: '50px', marginBottom: '14px', paddingTop: '10px', paddingRight: '35px', paddingBottom: '10px', paddingLeft: '15px'}}>
                                            <span className="input-box">
                                                <label id="label_id-area" className="label">ID</label>
                                                <input className="form-control" autoComplete="off" refs="id" type="text" id="id" onChange={this.showLabel} autoFocus style={{paddingTop: '0px', paddingRight: '0px', paddingBottom: '3px', paddingLeft: '0px'}} />
                                            </span>
                                        </div>
                                        <div className="border rounded-0 input-row" id="password-area" style={{height: '50px', marginBottom: '14px', paddingTop: '10px', paddingRight: '35px', paddingBottom: '10px', paddingLeft: '15px'}}>
                                            <span className="input-box">
                                                <label id="label_password-area" className="label">password</label>
                                                <input className="form-control" refs="password" type="password" id="password" onChange={this.showLabel} style={{paddingTop: '0px', paddingRight: '0px', paddingBottom: '3px', paddingLeft: '0px'}} />
                                            </span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" type="button" style={{width: '100%', marginTop: '30px', marginBottom: '50px', height: '70px', fontFamily: '"Nanum Gothic", sans-serif', fontSize: '25px', letterSpacing: '2px', backgroundColor: '#8D4B4B', borderColor: '#8D4B4B'}}>로그인</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;