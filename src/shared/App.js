import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/css/Header-Blue.css";
import "../assets/css/styles.css";
import facered from "../assets/img/facered.png";
import mainLeftCut from "../assets/img/mainleft_cut.png";
import logo from "../assets/img/logo3.png";


const initialState = {
  logIn: false,
  username: "",
  email: "",
  id: 0,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentWillMount() {
    const jwtCookie = Cookies.get('jwt')
    if (jwtCookie) {
      try {
        const jwtData = jwt.decode(jwtCookie)
        if (jwtData) {
          this.setState({
            logIn: true,
            username: jwtData.name,
            email: jwtData.email,
            id: jwtData.id,
          })
        } else {
          this.setState(initialState)
        }
      } catch (err) {
        console.debug('Invalid JWT. Silent authentication skipped.')
      }
    }
  }

  gotoLogin = e => {
    window.location.pathname = "/login"
  }

  gotoSignup = e => {
    window.location.pathname = "/signup"
  }

  handleLogout = e => {
    Cookies.set('jwt', null)
    window.location.reload()
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>main_real</title>
        <div className="main" style={{minWidth: '1280px'}}>
          <div className="main-right" style={{paddingRight: '3.9vw'}}><div />
              {this.state.logIn ? 
              (
              <div className="button-box" style={{height: '26.4vh', paddingTop: '1.39vh'}}>
                <img className="rounded-circle border border-dark profile" src={facered} style={{height: '60px'}} />
                <i className="fa fa-bell-o" id="noti" style={{fontSize: '35px', padding: '0 30px', marginTop: '15px'}} />
                <div className="btn-group" role="group" style={{marginTop: '15px'}}>
                 <button className="btn btn-primary" id="button-signout" type="button" onClick={this.handleLogout}>로그아웃</button>
                </div>
              </div>
              ) : (
              <div className="button-box" style={{height: '26.4vh', paddingTop: '1.39vh'}}>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" id="button-signup" type="button" onClick={this.gotoSignup}>회원가입</button>
                  <button className="btn btn-primary" id="button-signin" type="button" onClick={this.gotoLogin}>로그인</button>
                </div>
              </div>
              )}
            <div className="logobox" style={{margin: '0 auto', width: '18.2vw'}}><img src={logo} style={{width: '100%'}} /></div>
            <div className="d-flex justify-content-center searchbox"><i className="fa fa-search" /><input type="search" style={{width: '41.67vw', marginLeft: '15px', paddingTop: '10px'}} /></div>
          </div>
          <div className="image-box"><img id="main-image" src={mainLeftCut} /></div>
        </div>
      </div>
    )
  }
}

export default App;
