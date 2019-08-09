import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import ReactHtmlParser from 'react-html-parser'; 
import { PAGE_QUERY } from '../queries';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import facered from "../assets/img/facered.png";
import authorbox from "../assets/img/authorbox.png";
import logo3_editted_cut from "../assets/img/logo3_editted_cut.svg";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/css/styles.css";
import "../assets/css/untitled.css";

const initialState = {
    logIn: false,
    userName: "",
    email: "",
    userId: 0,
    search: "",
    title: "",
}

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {initialState}
    }

    componentWillMount() {
        const jwtCookie = Cookies.get('jwt');
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
        this.props.history.push(window.location.pathname)
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

    gotoEdit = e => {
        const id = parseInt(this.props.match.params.pageId, 10);
        const title = window.document.getElementById('page-title').textContent;
        window.location.pathname = `/edit/${id}/${title}`
    }

    gotoHome = e => {
        window.location.pathname = "/";
    }

    handleLogout = e => {
        Cookies.set('jwt', null)
        window.location.reload()
    }

    render() {
        const id = parseInt(this.props.match.params.pageId, 10);
        console.log(id)
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>viewpage_realreal</title>
                <header className="site-header" style={{minWidth: '1240px'}}>
                <div className="container" style={{maxWidth: '1750px', margin: '0 auto', paddingBottom: '20px'}}>
                    <img src={logo3_editted_cut} alt="logo" onClick={this.gotoHome} style={{cursor: 'pointer', width: '8em', marginRight: '10em', paddingBottom: '0px'}} />
                    <input
                        className="form-control-lg"
                        type="text"
                        style={{width: '53vw', paddingTop: '8px', zIndex: 13, height: '50px', marginLeft: '15px', marginRight: '10px'}}
                        onChange={ e => this.setState({search: e.target.value}) }
                        onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('search-icon').click()}} }/>
                    <i
                        id="search-icon"
                        style={{cursor: 'pointer'}}
                        className="fa fa-search"
                        onClick={this.gotoSearch}
                    />
                    {this.state.logIn ? 
                    (   
                        <div className="btn-group" role="group" style={{marginTop: '5px', width: '250px'}}>
                            <button className="btn btn-primary" id="button-signout" type="button" style={{borderRadius: '.25rem', margin: '15px', height: '38px'}} onClick={this.handleLogout}>로그아웃</button>
                            <i className="fa fa-bell-o" id="noti" style={{fontSize: '35px', padding: '0 5px', marginTop: '15px', marginRight: '15px'}} />
                            <img className="rounded-circle border border-dark profile" src={facered} alt="userimg" style={{height: '60px'}} />
                        </div>
                    ) : (
                        <div className="btn-group" role="group" style={{marginTop: '20px'}}>
                            <button className="btn btn-primary" id="button-signup" type="button" onClick={this.gotoSignup}>회원가입</button>
                            <button className="btn btn-primary" id="button-signin" type="button" onClick={this.gotoLogin}>로그인</button>
                        </div>
                    )}
                </div>
                <div className="clearfix" />
                </header>
                <Query query={PAGE_QUERY} variables={{ pageId: id }}>
                    {({ loading, data, error }) => {
                        if (loading) return "loading"
                        if (error) return "something happened"
                        console.log(data)
                        const page = data.pages.single;
                     return (
                        <div id="main" className="site-wrapper" style={{margin: '1em', minWidth: '1240px'}}>
                            <div className="container" style={{maxWidth: '1800px'}}>
                                <div className="post">
                                <header className="post-header" style={{paddingRight: '4vw'}}>
                                    {this.state.logIn ?
                                    (
                                    <div style={{display: "flex"}}>
                                        <h1 id="page-title" className="text-capitalize" style={{fontSize: '4em', fontFamily: 'Merriweather, serif', width: '1300px', marginTop: '5vw', marginBottom: '0.3em', marginLeft: '6.35vw'}}>
                                            {page.title}
                                        </h1>
                                        <button className="btn btn-primary" onClick={this.gotoEdit} style={{whiteSpace: 'normal', height: '38px', marginTop: '5vw', marginBottom: '0.3em', overflowX: 'visible', cursor: 'pointer'}} type="button">수정하기_</button>
                                    </div>
                                    ) : (
                                    <div style={{display: "flex"}}>
                                        <h1 className="text-capitalize" style={{fontSize: '4em', fontFamily: 'Merriweather, serif', width: '1300px', marginTop: '5vw', marginBottom: '0.3em', marginLeft: '6.35vw'}}>
                                            {page.title}
                                        </h1>
                                    </div>
                                    )}
                                    
                                    <div className="links" style={{marginLeft: '6.35vw', marginBottom: '1em', width: '1300px'}}><span style={{fontSize: '1em'}}>https://papers.nips.cc/paper/6687-compression-aware-training-of-deep-networks.pdf</span>
                                    <p className="edittime">Last edited : May 5, 2019</p>
                                    </div>
                                    <div className="author" style={{marginLeft: '6.35vw', fontSize: '2.4em'}}>
                                        <img src={authorbox} alt="authorbox" style={{marginRight: '20px'}} />
                                        <span style={{fontFamily: 'Montserrat, sans-serif'}}>Jose M. Alvarez, Mathieu Salzmann</span>
                                    </div>
                                </header>
                                </div>
                            </div>
                            <div className="tldr">
                                <ul className="tldr-content">
                                <li className="tldr-content-listitem">{page.description}<br /></li>
                                </ul>
                            </div>
                            <div className="post-wrapper">
                                <header style={{fontSize: '7em', fontFamily: '"Poiret One", cursive', letterSpacing: '-4px', marginTop: '70px'}}>
                                </header>
                                <article className="post-content">
                                <div> { ReactHtmlParser (page.render) } </div>
                                </article>
                            </div>
                        </div>
                    )}}
                </Query>
            </div>   
        )
    }
}

export default Main;