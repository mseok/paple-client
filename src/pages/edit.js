import React, { Component } from 'react';
import _ from 'lodash';
import markdownToHTML from '../lib/markdownEditor';
import { Query, Mutation } from 'react-apollo';
import { PAGE_QUERY, PAGE_CREATE_MUTATION } from '../queries';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import facered from "../assets/img/facered.png";
import authorbox from "../assets/img/authorbox.png";
import logo3_editted_cut from "../assets/img/logo3_editted_cut.svg";

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boxList: [],
            rowsList: [],
            textList: [],
            tldr: [], 
            isFirst: true,
            focusingBox: "",
            search: "",
            minRows: 1,
            maxRows: 100,
        }

        this.addBox = this.addBox.bind(this);
        this.deleteBox = this.deleteBox.bind(this);
        this.convertBox = this.convertBox.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.getInputBox = this.getInputBox.bind(this);
        this.getOutputBox = this.getOutputBox.bind(this);
        this.upBox = this.upBox.bind(this);
        this.downBox = this.downBox.bind(this);
        this.switch = this.switch.bind(this);
    }

    componentWillMount() {
        const jwtCookie = Cookies.get('jwt');
        if (jwtCookie === "null") {
            alert("You should login to modify content")
            window.location.pathname = "/"
        }
    }

    componentDidMount(){
        if (this.state.focusingBox !== "") {
            this.state.focusingBox.focus(); 
        }
    }

    handleLogout = e => {
        Cookies.set('jwt', null)
        window.location.reload()
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

    setData = data => {
        console.log(data)
        let nRows = (data.split('\n')).length;
        if (this.state.isFirst) {
            let initialTextList = [];
            let initialRowsList = [];
            let initialBoxList = [];
            
            initialTextList[0] = data;
            initialBoxList[0] = this.getOutputBox(0, data);
            initialRowsList[0] = nRows;
            this.setState({
                textList: initialTextList,
                rowsList: initialRowsList,
                isFirst: false,
                boxList: initialBoxList,
            })
        }
    }

    setTLDR = data => {
        console.log(data)
        let tlDescription = data.split("\n")
        this.setState({
            tldr: tlDescription
        })
    }

    getInputBox = (index, text) => (
        <div key={index} id={`input-${index}`} className="input" style={{width: '69em'}}>
            <textarea
                id={`text-${index}`}
                className="input-text"
                onChange={this.handleTextChange}
                autoFocus
                rows={this.state.rowsList[index]}
                placeholder="Write your text here"
                value={text}
                style={{width: '69em', maxWidth: '69em', border: '1px solid gray', marginBottom: '1vh'}}
                onKeyDown={ e => {
                    if (e.shiftKey) {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            return false
                        }
                    }
                }}
                onKeyUp={ async e => {
                    let textArea = e.currentTarget;
                    const boxNumber = parseInt((textArea.id).slice(-1), 10);
                    const { rowsList, minRows, maxRows } = this.state;
                    const prevRow = textArea.rows;
                    textArea.rows = minRows;
                    let newRow = ~~(textArea.scrollHeight/27.2);

                    if ( newRow === prevRow) {
                        textArea.rows = newRow;
                    } else if ( newRow > prevRow) {
                        newRow = (newRow > maxRows) ? maxRows : newRow;
                        textArea.rows = newRow;
                        rowsList[boxNumber] = newRow;
                    } else if ( newRow > minRows ) {
                        textArea.rows = newRow;
                        rowsList[boxNumber] = newRow;
                    }
                    
                    if (e.shiftKey && e.keyCode === 13) {
                        window.document.getElementById(`button-confirm-${index}`).click()
                    }
                    this.setState({rowsList})
                }}
            />
            <div style={{width: '10em', float: 'right', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '-10px'}}>
                <button id={`button-confirm-${index}`} style={{background: 'none', border: 'none'}} onClick={this.convertBox}>
                    ⭕
                </button>
                <button id={`button-delete-${index}`} style={{background: 'none', border: 'none'}} onClick={this.deleteBox}>
                    ❌
                </button>
                <button id={`button-up-${index}`} style={{background: 'none', border: 'none'}} onClick={this.upBox}>
                    🔺
                </button>
                <button id={`button-down-${index}`} style={{background: 'none', border: 'none'}} onClick={this.downBox}>
                    🔻
                </button>
            </div>
        </div>

    )

    getOutputBox = (index, text) => (
        <div key={index} id={`output-${index}`} className="output" style={{width: '69em', maxWidth: '69em'}} onDoubleClick={this.convertBox}>
            <div 
                id={`markdown-${index}`}
                dangerouslySetInnerHTML={this.getRawMarkup(text)}
                className="output-text"
            >
            </div>
        </div>
    )

    getRawMarkup = text => ({__html: markdownToHTML(text)})

    handleTextChange = async e => {
        let { boxList, rowsList, textList } = this.state;
        let boxNumber = parseInt((e.target.id).slice(-1), 10);

        textList[boxNumber] = e.target.value;
        boxList[boxNumber] = this.getInputBox(boxNumber, textList[boxNumber])

        await this.setState({ boxList, rowsList, textList })
    }

    switch = (type, arr, idx) => {
        if (type === "upper") {
            let higher = arr[idx - 1]
            let lower = arr[idx]

            arr[idx - 1] = lower;
            arr[idx] = higher;
        } else {
            let higher = arr[idx]
            let lower = arr[idx + 1]

            arr[idx] = lower;
            arr[idx + 1] = higher;
        }
    }

    upBox = e => {
        let { boxList, rowsList, textList } = this.state;
        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);
        
        if (boxList.length >= 2 && boxNumber !== 0) {
            this.switch("upper", textList, boxNumber)
            this.switch("upper", typeList, boxNumber)
            this.switch("upper", rowsList, boxNumber)

            let newRowsList = newIndexList.map(x => Object.values(rowsList)[x])
            let newTextList = newIndexList.map(x => Object.values(textList)[x])
            let newBoxList = newIndexList.map(
                x => ((typeList[x] === 'input') ? this.getInputBox(x, newTextList[x]) : this.getOutputBox(x, newTextList[x]))
            )
            
            this.setState({
                boxList: newBoxList,
                rowsList: newRowsList,
                textList: newTextList,
                focusingBox: newBoxList[boxNumber - 1],
            })
        }
    }

    downBox = e => {
        let { boxList, rowsList, textList } = this.state;
        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);

        if (boxList.length >= 2 && boxNumber !== boxList.length) {
            this.switch("downer", textList, boxNumber)
            this.switch("downer", typeList, boxNumber)
            this.switch("downer", rowsList, boxNumber)

            let newRowsList = newIndexList.map(x => Object.values(rowsList)[x])
            let newTextList = newIndexList.map(x => Object.values(textList)[x])
            let newBoxList = newIndexList.map(
                x => ((typeList[x] === 'input') ? this.getInputBox(x, newTextList[x]) : this.getOutputBox(x, newTextList[x]))
            )

            
            this.setState({
                boxList: newBoxList,
                rowsList: newRowsList,
                textList: newTextList,
            })
        }
    }

    addBox = async () => {
        const { boxList, rowsList, textList } = this.state;
        let boxNumber;
        
        if (Object.keys(boxList).length === 0) {
            boxNumber = 0;
        } else {
            let boxListIdx = boxList[boxList.length - 1].key
            boxNumber = parseInt(boxListIdx, 10) + 1;
        }

        rowsList[boxNumber] = 1
        await this.setState({ rowsList })

        let inputBox = this.getInputBox(boxNumber, "")
        
        boxList[boxNumber] = inputBox
        textList[boxNumber] = ""
        this.setState({ boxList, textList })
    }

    deleteBox = async e => {
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);
        let { boxList, rowsList, textList } = this.state;

        boxList = boxList.slice(0, boxNumber).concat(boxList.slice(boxNumber + 1, boxList.length))
        rowsList = rowsList.slice(0, boxNumber).concat(rowsList.slice(boxNumber + 1, rowsList.length))
        textList = textList.slice(0, boxNumber).concat(textList.slice(boxNumber + 1, textList.length))

        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        let that = this;

        let newRowsList = newIndexList.map(x => Object.values(rowsList)[x])
        let newTextList = newIndexList.map(x => Object.values(textList)[x])
        await this.setState({ rowsList: newRowsList })

        let newBoxList = newIndexList.map(
            x => ((typeList[x] === 'input') ? that.getInputBox(x, newTextList[x]) : that.getOutputBox(x, newTextList[x]))
        )
        this.setState({
            boxList: newBoxList,
            textList: newTextList,
        })
    }

    convertBox = e => {
        e.preventDefault()
        if (e.currentTarget.className == 'output') {
            let boxList = this.state.boxList;
            let boxNumber = (e.currentTarget.id).slice(-1);
            let inputBox = this.getInputBox(boxNumber, this.state.textList[boxNumber])
            
            boxList[boxNumber] = inputBox;
            
            this.setState({
                boxList: boxList,
            })
        } else {
            let boxList = this.state.boxList;
            let textList = this.state.textList;
            let boxNumber = (e.currentTarget.id).slice(-1);
            let outputBox = this.getOutputBox(boxNumber, textList[boxNumber]);
            
            boxList[boxNumber] = outputBox;
    
            this.setState({
                boxList: boxList,
            })
        }   
    }

    render() {
        const id = parseInt(this.props.match.params.pageId, 10);
        const textList = this.state.textList;
        const title = this.props.match.params.pageTitle;

        let textContents = "";
        for (let i=0;i<textList.length;i++) {
            textContents += (textList[i]+ "\n")
        }

        let tldr = this.state.tldr;
        tldr = tldr.join("\n");

        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>Editting page</title>
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
                        </div>
                    <div className="clearfix" />
                </header>
                <Query query={PAGE_QUERY} variables={{ pageId: id }} onCompleted={data => {this.setData(data.pages.single.content); this.setTLDR(data.pages.single.description)}}>
                    {({ loading, data, error }) => {
                        if (loading) return "loading"
                        if (error) {console.log(error); return "something happened"}
                        const page = data.pages.single;
                        let description = page.description;
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
                                            <div className="links" style={{marginLeft: '6.35vw', marginRight: '0', marginBottom: '1em', width: '1300px'}}>
                                                <span className="head-link">{page.referenceLink}</span>
                                                <p className="head-edittime">{page.updatedAt}</p>
                                            </div>
                                            <div className="btn-group" style={{width: '120px'}} role="group">
                                                <Mutation mutation={PAGE_CREATE_MUTATION}>
                                                    {mutate => (
                                                        <button 
                                                            className="btn btn-primary" 
                                                            id="button-signout" 
                                                            type="button" 
                                                            onClick={async () => {
                                                                const response = await mutate({
                                                                    variables: { pageId: id, content: textContents, description: tldr }
                                                                })
                                                                let respObj = _.get(response, 'data.pages.update', {})
                                                                if (respObj.responseResult.succeeded) {
                                                                    _.delay(() => {
                                                                        window.location.replace(`/main/${id}/${title}`)
                                                                        return
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                            저장하기
                                                        </button>
                                                    )}
                                                </Mutation>
                                            </div>
                                            <div className="author">
                                                <img src={authorbox} style={{marginRight: '20px'}} />
                                                <span className="head-auhtor">{page.thesisAuthor}</span>
                                            </div>
                                        </header>
                                    </div>
                                </div>
                                <div className="tldr">
                                    <p className="tldr-title">세 줄 요약</p>
                                    <ol className="tldr-content" type="i">
                                        <li className="tldr-content-listitem">
                                            <input
                                                className="tldrinput"
                                                style={{border: 'none', borderBottom: '1px solid gray', width: '30em'}}
                                                placeholder="First sentence!"
                                                onChange={ e => {
                                                    let tldr = this.state.tldr;
                                                    tldr[0] = e.target.value;
                                                    this.setState({tldr})
                                                }}
                                                defaultValue={tlDescription[0]}
                                            >
                                            </input>
                                        </li>
                                        <li className="tldr-content-listitem">
                                            <input
                                                className="tldrinput"
                                                style={{border: 'none', borderBottom: '1px solid gray', width: '30em'}}
                                                placeholder="Second sentence!"
                                                onChange={ e => {
                                                    let tldr = this.state.tldr;
                                                    tldr[1] = e.target.value;
                                                    this.setState({tldr})
                                                }}
                                                defaultValue={tlDescription[1]}
                                            >
                                            </input>
                                        </li>
                                        <li className="tldr-content-listitem">
                                            <input
                                                className="tldrinput"
                                                style={{border: 'none', borderBottom: '1px solid gray', width: '30em'}}
                                                placeholder="Third sentence!"
                                                onChange={ e => {
                                                    let tldr = this.state.tldr;
                                                    tldr[2] = e.target.value;
                                                    this.setState({tldr})
                                                }}
                                                defaultValue={tlDescription[2]}
                                            >
                                            </input>
                                        </li>
                                    </ol>
                                    <p className="tldr-foot" />
                                </div>
                                <div style={{display: 'flex',}}>
                                    <button 
                                        style={{position: 'sticky', top: '10px',padding: '0', width: '4.5vw', height: '4.5vw', marginLeft: '7vw', marginRight: '1vw', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: 'none', borderRadius: '100%', background: 'rgb(97, 20, 39)', color: 'white'}}
                                        onClick={this.addBox}
                                    >
                                        <h1>+</h1>
                                    </button>
                                    <article className="post-content" style={{marginLeft: '0'}}>
                                        {Object.values(this.state.boxList)}
                                    </article>
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default Edit;