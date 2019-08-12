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
  userName: "",
  email: "",
  userId: 0,
  search: "",
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
            userName: jwtData.name,
            email: jwtData.email,
            userId: jwtData.id,
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

  gotoSearch = e => {
    const search = this.state.search;
    if (search !== "") {
      window.location.pathname = `/search/${search}`
    }
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
                <div className="btn-group" style={{float: 'right', top: '0', width: '250px', height: '60px', color: 'black'}} role="group">
                  <button className="btn btn-primary" id="button-signout" style={{borderRadius: '.25rem', borderColor: '#611427', margin: '11px 10px', height: '38px', fontSize: '12px', fontWeight: '400'}} type="button" onClick={this.handleLogout}>로그아웃</button>
                  <img className="rounded-circle border border-dark profile" alt="userimg" src={facered} style={{margin: '0 10px', height: '60px'}} />
                  <i className="fa fa-bell-o" id="noti" style={{fontSize: '35px', padding: '0 10px', marginTop: '15px'}} />
                </div>
              </div>
              ) : (
              <div className="button-box" style={{height: '26.4vh', paddingTop: '1.39vh'}}>
                <div className="btn-group" style={{float: 'right', top: '0', width: '160px', height: '60px', color: 'black'}} role="group">
                  <button className="btn btn-primary" id="button-signup" style={{marginTop: '11px', marginBottom: '11px', borderColor: '#611427', color: '#611427', fontSize: '12px', fontWeight: '400'}} type="button" onClick={this.gotoSignup}>회원가입</button>
                  <button className="btn btn-primary" id="button-signin" style={{marginTop: '11px', marginBottom: '11px', borderColor: '#611427', backgroundColor: '#611427', color: 'white', fontSize: '12px', fontWeight: '400'}} type="button" onClick={this.gotoLogin}>로그인</button>
                </div>
              </div>
              )}
            <div className="logobox" style={{margin: '0 auto', width: '18.2vw'}}><img src={logo} alt="logo" style={{width: '100%'}} /></div>
            <div className="d-flex justify-content-center searchbox">
              <input
                type="search"
                style={{width: '41.67vw', marginLeft: '15px', marginRight: '10px', fontSize: '20px'}}
                onChange={ e => this.setState({search: e.target.value}) }
                onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('search-icon').click()}} }
              />
              <i
                id="search-icon"
                style={{cursor: 'pointer'}}
                className="fa fa-search"
                onClick={this.gotoSearch}
              />
            </div>
          </div>
          <div className="image-box"><img id="main-image" alt="mainimage" src={mainLeftCut} /></div>
        </div>
      </div>
    )
  }
}

export default App;
