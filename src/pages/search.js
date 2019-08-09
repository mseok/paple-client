import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { SEARCH_QUERY } from '../queries';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import facered from "../assets/img/facered.png";
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
}

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {initialState}
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

    gotoPage = e => {
        return new Promise( (resolve, reject) => {
            const pageId = e.target.id;
            resolve(pageId)
        }).then(function(pageId) {
            window.location.pathname = `main/${pageId}`
        })
    }

    gotoLogin = e => {
        console.log(this.props)
        if (!this.state.login) {
            window.location.replace('/login')
        }
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

    gotoHome = e => {
        window.location.pathname = "/"
    }

    handleLogout = e => {
        Cookies.set('jwt', null)
        window.location.reload()
    }

    render() {
        return(
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>viewpage_real</title>
                <header className="site-header" style={{minWidth: '1240px', position: 'sticky', top: '0px', background: 'white'}}>
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
                                <img className="rounded-circle border border-dark profile" alt="userimg" src={facered} style={{height: '60px'}} />
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
                <Query query={SEARCH_QUERY} variables={{ query: this.props.match.params.search }}>
                {({ loading, data, error }) => {
                    if (loading) return "loading"
                    if (error) return "something happened"
                    let id = [];
                    let title = []
                    const pageData = data.pages.search.results;
                    pageData.forEach(array => {id.push(array.id); title.push(array.title)})
                    
                    return (pageData.map(array => 
                        <div id="main" className="site-wrapper" style={{margin: '1em', minWidth: '1240px'}}>
                            <div className="post" onClick={this.gotoPage}>
                                <header id={array.id} className="post-header" style={{padding: '15px', marginBotton: '10px', border: '1px solid black'}}>
                                    <h3 id={array.id} style={{width: '1340px'}}>{array.id}</h3>
                                    <h1 id={array.id} className="text-capitalize" style={{fontSize: '4em', fontFamily: 'Merriweather, serif', width: '1340px'}}>
                                        {array.title}
                                    </h1>
                                </header>
                            </div>
                        </div>
                    ))
                }}
                </Query>
            </div>
        )
    }
}

export default Search;