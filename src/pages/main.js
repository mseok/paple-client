import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ReactHtmlParser from 'react-html-parser'; 
import { PAGE_QUERY } from '../queries';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
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

    UNSAFE_componentWillMount() {
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

    gotoLogin = () => {
        window.location.pathname = "/login"
    }

    gotoSignup = () => {
        window.location.pathname = "/signup"
    }

    gotoSearch = () => {
        const search = this.state.search;
        if (search !== "") {
          window.location.pathname = `/search/${search}`
        }
    }

    gotoEdit = () => {
        const id = parseInt(this.props.match.params.pageId, 10);
        const title = window.document.getElementById('page-title').textContent;
        window.location.pathname = `/edit/${id}/${title}`
    }

    gotoLog = () => {
        const id = parseInt(this.props.match.params.pageId, 10);
        const title = window.document.getElementById('page-title').textContent;
        window.location.pathname = `/log/${id}/${title}`
    }

    gotoHome = () => {
        window.location.pathname = "/";
    }

    handleLogout = () => {
        Cookies.set('jwt', null)
        window.location.reload()
    }

    render() {
        const id = parseInt(this.props.match.params.pageId, 10);
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>Editting page</title>
                <header className="site-header" style={{minWidth: '1240px', paddingLeft: 0, paddingRight: 0, paddingTop: '4px'}}>
                    <div className="container" style={{margin: 0, paddingBottom: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '75px', paddingRight: '50px', maxWidth: '100%'}}>
                        <img src={logo3_editted_cut} alt="logo" style={{cursor: 'pointer', height: '5em', marginRight: '3em', paddingBottom: '0px'}} onClick={this.gotoHome} />
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
                                    alt="profile"
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
                <Query query={PAGE_QUERY} variables={{ pageId: id }}>
                    {({ loading, data, error }) => {
                        if (loading) return "loading"
                        if (error) {console.log(error); return "something happened"}
                        const page = data.pages.single
                        let description = page.description
                        let tlDescription = description.split("\n")

                        return (
                            <div id="main" className="site-wrapper" style={{margin: '1em', minWidth: '1240px'}}>
                                <div className="container" style={{maxWidth: '1800px'}}>
                                    <div className="post">
                                        <header className="post-header" style={{paddingRight: '4vw'}}>
                                            <h1 className="text-capitalize head-title" id="page-title">
                                                {page.title}
                                                <br />
                                            </h1>
                                            <div className="links" style={{marginLeft: '6.35vw', marginBottom: '1em', width: '1300px'}}>
                                                <a className="head-link" href={page.referenceLink}>{page.referenceLink}</a>
                                                <p className="head-edittime">{page.updatedAt}</p>
                                            </div>
                                            {this.state.logIn ? 
                                            (
                                                <div className="btn-group" role="group">
                                                    <button className="btn btn-primary" type="button" onClick={this.gotoLog}>수정내역</button>
                                                    <button className="btn btn-primary" type="button" onClick={this.gotoEdit}>수정하기</button>
                                                </div>
                                            ) : (
                                                <div className="btn-group" role="group">
                                                </div>
                                            )}
                                            <div className="author">
                                                <img src={authorbox} alt="authorbox" style={{marginRight: '20px', height: '100%'}} />
                                                <span className="head-auhtor">{page.thesisAuthor}</span>
                                            </div>
                                        </header>
                                    </div>
                                </div>
                                <div className="tldr">
                                    <p className="tldr-title">세 줄 요약</p>
                                    <ol className="tldr-content" type="i">
                                        <li className="tldr-content-listitem">{tlDescription[0]}<br /></li>
                                        <li className="tldr-content-listitem">{tlDescription[1]}<br /></li>
                                        <li className="tldr-content-listitem">{tlDescription[2]}<br /></li>
                                    </ol>
                                    <p className="tldr-foot" />
                                </div>
                                <article className="post-content">
                                    <div className="post-wrapper">
                                        { ReactHtmlParser (page.render) }
                                    </div>
                                </article>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

Main.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        pageId: PropTypes.string,
      }),
    }),
};

export default Main;