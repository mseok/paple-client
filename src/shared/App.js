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
        <title>main</title>
        {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700" />*/}
        <div>
          <div className="container" style={{margin: '0px', maxHeight: 'none', minHeight: '360px', maxWidth: '100%', minWidth: '100%', paddingRight: '0px'}}>
            <div className="row" style={{maxHeight: '100%', maxWidth: '1200px', minWidth: '100%'}}>
              <div className="col-md-5 col-xl-5" style={{paddingLeft: '0px', maxHeight: 'none'}}>
                <img className="img-fluid" src={mainLeftCut} style={{maxWidth: '100%', maxHeight: '100%'}} />
              </div>
              <div className="clearfix" />
              <div className="col-md-7 col-xl-7" style={{paddingRight: '15px', marginRight: '0px'}}>
                <div className="row" style={{minHeight: '250px', maxHeight: '300px', height: '30%'}}>
                  <div className="col d-xl-flex justify-content-xl-end align-items-xl-start" style={{minHeight: '100%', maxHeight: '100%'}}>
                    <div className="btn-toolbar">
                      <div className="btn-group" role="group">
                        <button className="btn btn-primary btn-lg bg-danger border-danger" type="button" onClick={this.gotoLogin}>
                          로그인
                        </button>
                        <button className="btn btn-primary btn-lg text-danger bg-white border-danger" type="button" onClick={this.gotoSignup}>
                          회원가입
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-xl-flex justify-content-xl-center" style={{maxHeight: 'auto', height: 'auto', minHeight: 'auto'}}>
                  <div className="col d-xl-flex align-items-center justify-content-xl-center" style={{minHeight: '100%', maxHeight: '100%'}}><img className="img-fluid" src={logo} style={{maxHeight: '100%', minWidth: '412px', maxWidth: '412px', minHeight: '100%'}} /></div>
                </div>
                <div className="row">
                  <div className="col d-xl-flex justify-content-xl-center"><i className="fa fa-search" style={{fontSize: '40px'}} /><input className="shadow form-control-lg" type="search" style={{minWidth: '90%', maxWidth: '90%'}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default App;
