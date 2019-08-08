import React, { Component } from 'react';
import Cookies from 'js-cookie';
import _ from 'lodash';
import markdownToHTML from '../lib/markdownEditor';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import logo from "../assets/img/logo3.png";

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Write markdown Text in here',
            boxList: [],
            textList: [],     
        }

        this.addBox = this.addBox.bind(this);
        this.convertBox = this.convertBox.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    getRawMarkup(index) {
        return {__html: markdownToHTML(this.state.textList[index])}
    }

    handleTextChange = e => {
        let textList = this.state.textList;
        let boxNumber = (e.target.id).slice(-1);

        textList[boxNumber] = e.target.value;

        this.setState({
            textList: textList,
        })
    }

    addBox() {
        const boxList = this.state.boxList;
        const textList = this.state.textList;
        const boxNumber = boxList.length;
        
        let inputBox = (
            <div key={boxNumber} className="input" style={{width: '85vw', display: 'flex'}}>
                <textarea
                    id={`text-${boxNumber}`}
                    className="input-text"
                    rows="5"
                    onChange={this.handleTextChange}
                    defaultValue={this.state.text}
                    style={{width: '80vw', border: '1px solid gray', marginBottom: '1vh'}}
                />
                <div style={{width: '2vw'}}>
                    <button 
                        id={`button-${boxNumber}`}
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '1vh', backgroundColor: 'green', borderRadius: '.25em', border: 'none', color: 'white'}}
                        onClick={this.convertBox}
                    >
                        <h2>V</h2>
                    </button>
                    <button 
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', backgroundColor: 'red', borderRadius: '.25em', border: 'none', color: 'white'}}
                    >
                        <h2>X</h2>
                    </button>
                </div>
            </div>
        )

        boxList.push(inputBox)
        textList.push("")
        
        this.setState({
            boxList: boxList,
            textList: textList,
        })
    }

    deleteBox() {
        return
    }

    convertBox = e => {
        // if id == output -> double click becomes input
        // if id == input -> shift+enter becomes output
        e.preventDefault()
        let boxList = this.state.boxList;
        let boxNumber = (e.currentTarget.id).slice(-1);
        let outputBox = (
            <div key={boxNumber} className="output" style={{width: '40vw'}}>
                <div 
                    id={`markdown-${boxNumber}`}
                    dangerouslySetInnerHTML={this.getRawMarkup(boxNumber)}
                    className="output-text"
                >
                </div>
            </div>
        )
        
        boxList[boxNumber] = outputBox;

        this.setState({
            boxList: boxList,
        })
    }

    render() {
        const title = this.props.match.params.title;
        return (
            <div>
                <header
                    className="site-header"
                    style={{margin: '0', minWidth: '1240px', background: '#303030', color: 'white', display: 'flex', justifyContent: 'space-between'}}
                >
                    <h1 style={{marginLeft: '20px'}}>{title}</h1>
                    <button 
                        className="btn btn-primary" 
                        id="button-signout" 
                        type="button" 
                        style={{borderColor: 'white', backgroundColor: '#303030', color: 'white', borderRadius: '.25rem', margin: '10px', marginRight: '20px', height: '38px'}}
                    >
                        저장하기
                    </button>
                </header>
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
                    <div style={{width: '5vw', marginTop: '5vh', marginLeft: '5vw', display: 'flex'}}>
                        <button 
                            style={{width: '3vw', height: '3vw', marginLeft: '1vw', marginRight: '1vw', backgroundColor: '#303030', borderRadius: '.25em', border: 'none', color: 'white'}}
                            onClick={this.addBox}
                        >
                            <h1>+</h1>
                        </button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80vw', marginTop: '5vh', marginRight: '10vw'}}>
                        {this.state.boxList}
                        {/* <div id='1' className="input" style={{width: '80vw'}}>
                            <h3>Input</h3>
                            <textarea
                                className="input-text"
                                rows="10"
                                onChange={ e => this.setState({text: e.target.value})}
                                defaultValue={this.state.text}
                                style={{width: '80vw', border: 'none'}}
                            />
                        </div> */}
                        {/* <div className="output" style={{width: '40vw'}}>
                            <h3>Markdown</h3>
                            <div 
                                dangerouslySetInnerHTML={this.getRawMarkup()}
                                className="output-text"
                            >
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;