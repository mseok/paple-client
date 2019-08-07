import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PAGE_QUERY, PAGE_LIST_QUERY } from '../queries';
import Cookies from 'js-cookie';
import facered from "../assets/img/facered.png";
import authorbox from "../assets/img/authorbox.png";
import logo3_editted_cut from "../assets/img/logo3_editted_cut.svg";
import _ from 'lodash';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/css/styles.css";
import "../assets/css/untitled.css"
import { arrayExpression } from '@babel/types';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
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

    gotoSearch = e => {
        const search = this.state.search;
        if (search !== "") {
          window.location.pathname = `/search/${search}`
        }
    }

    gotoHome = e => {
        window.location.pathname = "/"
    }

    render() {
        return(
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>viewpage_real</title>
                <header className="site-header" style={{minWidth: '1240px', position: 'sticky', top: '0px', background: 'white'}}>
                    <div className="container" style={{maxWidth: '1750px', margin: '0 auto', paddingBottom: '20px'}}>
                        <img src={logo3_editted_cut} onClick={this.gotoHome} style={{cursor: 'pointer', width: '8em', marginRight: '10em', paddingBottom: '0px'}} />
                        <input
                            className="form-control-lg"
                            type="text"
                            style={{width: '55vw', paddingTop: '8px', zIndex: 13, height: '50px', marginLeft: '15px', marginRight: '10px'}}
                            onChange={ e => this.setState({search: e.target.value}) }
                            onKeyUp={ e => {if (e.keyCode === 13) {window.document.getElementById('search-icon').click()}} }/>
                        <i id="search-icon" style={{cursor: 'pointer'}} className="fa fa-search" onClick={this.gotoSearch} />
                        <img className="rounded-circle border border-dark Thumbnail" src={facered} style={{height: '80px'}} />
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