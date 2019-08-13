import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PAGE_LIST_QUERY } from '../queries';
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
        // return new Promise( (resolve, reject) => {
        //     const pageId = e.target.id;
        //     resolve(pageId)
        // }).then(function(pageId) {
        //     window.location.pathname = `main/${pageId}`
        // })
        const pageId = e.target.id;
        let [id, title] = pageId.split('-')
        window.location.pathname = `main/${id}/${title}`
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
                <header className="site-header" style={{minWidth: '1240px', paddingLeft: 0, paddingRight: 0, paddingTop: '4px'}}>
                    <div className="container" style={{margin: 0, paddingBottom: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '75px', paddingRight: '50px', maxWidth: '100%'}}>
                        <img src={logo3_editted_cut} style={{cursor: 'pointer', height: '5em', marginRight: '3em', paddingBottom: '0px'}} onClick={this.gotoHome} />
                        <div style={{display: 'flex', width: '60vw', }}>
                            <input 
                                className="form-control-lg" 
                                type="text" 
                                style={{width: '55vw', paddingTop: '8px', zIndex: 13, height: '50px', marginTop: '13px', fontSize: '20px', fontFamily: 'Roboto, sans-serif', marginLeft: '5px', marginRight: '5px', paddingLeft: '20px'}}
                                placeholder="Search here" 
                                onChange={ e => this.setState({search: e.target.value}) }
                                onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('search-icon').click()}} }
                            />
                            <i
                                id="search-icon"
                                style={{cursor: 'pointer', marginTop: '15px'}}
                                className="fa fa-search"
                                onClick={this.gotoSearch}
                            />
                        </div>
                        {this.state.logIn ? 
                        (   
                            <div className="thumbnail-bar" style={{marginTop: '1px'}}>
                                <button 
                                    className="btn btn-primary" 
                                    id="button-signout" 
                                    type="button" 
                                    style={{borderRadius: '.25rem', marginTop: '15px', height: '38px', borderColor: '#611427', fontSize: '12px'}}
                                    onClick={this.handleLogout}
                                >
                                    로그아웃
                                </button>
                                <img 
                                    className="rounded-circle border border-dark Thumbnail" 
                                    src={facered} 
                                    style={{height: '50px', marginTop: '8px'}} 
                                />
                                <i 
                                    className="fa fa-bell-o"
                                    style={{fontSize: '3em', padding: '0.2em', float: 'right'}}
                                />
                            </div>
                        ) : (
                            <div className="thumbnail-bar" style={{marginTop: '1px'}}>
                                <button 
                                    className="btn btn-primary" 
                                    id="button-signup" 
                                    type="button" 
                                    style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', marginTop: '15px', height: '38px', borderColor: '#611427', fontSize: '12px'}}
                                    onClick={this.gotoSignup}
                                >
                                    회원가입
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    id="button-signin" 
                                    type="button" 
                                    style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', marginTop: '15px', height: '38px', background: '#611427', color: 'white', borderColor: '#611427', fontSize: '12px'}}
                                    onClick={this.gotoLogin}
                                >
                                    로그인
                                </button>
                            </div>
                        )}
                        </div>
                    <div className="clearfix" />
                </header>
                <Query query={PAGE_LIST_QUERY}>
                {({ loading, data, error }) => {
                    if (loading) return "loading"
                    if (error) return "something happened"
                    let id = [];
                    let title = []
                    const pageData = data.pages.list;
                    console.log(pageData)
                    pageData.forEach(array => {id.push(array.id); title.push(array.title)})
                    
                    return (pageData.map(array => 
                        <div id="main" className="site-wrapper" style={{margin: '1em', minWidth: '1240px'}}>
                            <div className="post" onClick={this.gotoPage}>
                                <header id={`${array.id}-${array.title}`} className="post-header" style={{padding: '15px', marginBotton: '10px', border: '1px solid black'}}>
                                    <h3 id={`${array.id}-${array.title}`} style={{width: '1340px'}}>{array.id}</h3>
                                    <h1 id={`${array.id}-${array.title}`} className="text-capitalize" style={{fontSize: '4em', fontFamily: 'Merriweather, serif', width: '1340px'}}>
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