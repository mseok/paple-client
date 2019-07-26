import React, { Component } from 'react';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/css/Header-Blue.css";
import "../assets/css/styles.css";
import mainLeftCut from "../assets/img/mainleft_cut.png";
import logo from "../assets/img/logo3.png";


class App extends Component {

  gotoLogin = e => {
    window.location.pathname = "/login"
  }

  gotoSignup = e => {
    window.location.pathname = "/signup"
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>main_real</title>
        <div className="main" style={{minWidth: '1280px'}}>
          <div className="main-right" style={{paddingRight: '75px'}}>
            <div />
            <div className="button-box" style={{height: '26.4vh', paddingTop: '2.8vh'}}>
              <div className="btn-group" role="group">
                <button className="btn btn-primary" id="button-signup" type="button" onClick={this.gotoSignup}>회원가입</button>
                <button className="btn btn-primary" id="button-signin" type="button" onClick={this.gotoLogin}>로그인</button>
              </div>
            </div>
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
