import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PAGE_QUERY } from '../queries';
import Cookies from 'js-cookie';
import facered from "../assets/img/facered.png";
import authorbox from "../assets/img/authorbox.png";
import logo3_editted_cut from "../assets/img/logo3_editted_cut.svg";
import _ from 'lodash';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/css/styles.css";
import "../assets/css/untitled.css"

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
        }
    }

    gotoSearch = e => {
        const search = this.state.search;
        if (search !== "") {
          window.location.pathname = `/search/${search}`
        }
    }

    gotoHome = e => {
        window.location.pathname = "/";
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
                    <img src={logo3_editted_cut} onClick={this.gotoHome} style={{cursor: 'pointer', width: '8em', marginRight: '10em', paddingBottom: '0px'}} />
                    <input 
                        className="form-control-lg"
                        type="text" 
                        style={{width: '55vw', paddingTop: '8px', zIndex: 13, height: '50px', marginLeft: '15px', marginRight: '10px'}}
                        onChange={ e => this.setState({search: e.target.value}) }
                        onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('search-icon').click()}} }
                    />
                    <i id="search-icon" style={{cursor: 'pointer'}} className="fa fa-search" onClick={this.gotoSearch} />
                    <img className="rounded-circle border border-dark Thumbnail" src={facered} style={{height: '80px'}} />
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
                                <header className="post-header" style={{paddingRight: '20vw'}}>
                                    <h1 className="text-capitalize" style={{fontSize: '4em', fontFamily: 'Merriweather, serif', width: '1300px', marginTop: '5vw', marginBottom: '0.3em', marginLeft: '6.35vw'}}>
                                        {page.title}
                                        <br />
                                    </h1>
                                    <div className="links" style={{marginLeft: '6.35vw', marginBottom: '1em', width: '1300px'}}><span style={{fontSize: '1em'}}>https://papers.nips.cc/paper/6687-compression-aware-training-of-deep-networks.pdf</span>
                                    <p className="edittime">Last edited : May 5, 2019</p>
                                    </div>
                                    <div className="author" style={{marginLeft: '6.35vw', fontSize: '2.4em'}}>
                                        <img src={authorbox} style={{marginRight: '20px'}} />
                                        <span style={{fontFamily: 'Montserrat, sans-serif'}}>Jose M. Alvarez, Mathieu Salzmann</span>
                                    </div>
                                </header>
                                </div>
                            </div>
                            <div className="tldr">
                                <ul className="tldr-content">
                                <li className="tldr-content-listitem">You can use a comma-separated list to apply styles when the user's device matches any one of various media types, features, or states.<br /></li>
                                <li className="tldr-content-listitem">For instance, the following rule will apply its styles if the user's device has either a minimum height of 680px <em>or</em> is a screen device in portrait mode:<br /></li>
                                <li className="tldr-content-listitem">Taking the above example, if the user had a printer with a page <br />height of 800px, the media statement would return true because the first query would apply. Likewise, if the user were on a smartphone in portrait mode with a viewport
                                    height of 480px, the second query would apply and the media statement would still return true.<br /></li>
                                </ul>
                            </div>
                            <div className="post-wrapper">
                                <header style={{fontSize: '7em', fontFamily: '"Poiret One", cursive', letterSpacing: '-4px', marginTop: '70px'}}>
                                <p className="d-xl-flex" style={{fontFamily: '"Poiret One", cursive', color: 'rgba(141,75,75,0.55)'}}>0. Abstract</p>
                                </header>
                                <article className="post-content">
                                <p className="lead"><br />{page.content}<br /></p>
                                <blockquote className="blockquote" style={{paddingTop: '1em', paddingRight: '4em', paddingBottom: '1em', paddingLeft: '4em', marginLeft: '250px', marginRight: '550px', marginTop: '2em', marginBottom: '2em'}}>
                                    <p className="blockquote-paragraph" style={{fontFamily: 'Montserrat, sans-serif', fontSize: '2em'}}>you can add this quotes as just one click with just a simple method. Though it could be worse, you are gonna be alright.</p>
                                    <footer className="blockquote-footer d-xl-flex justify-content-xl-end" style={{fontFamily: 'Montserrat, sans-serif'}}>Someone famous</footer>
                                </blockquote>
                                <p className="lead">{page.content}</p>
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