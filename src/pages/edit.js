import React, { Component } from 'react';
import Cookies from 'js-cookie';
import _ from 'lodash';
import markdownToHTML from '../lib/markdownEditor';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import logo from "../assets/img/logo3.png";
import { arrayExpression } from '@babel/types';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: 'Write your text here',
            boxList: [],
            textList: [],     
        }

        this.addBox = this.addBox.bind(this);
        this.deleteBox = this.deleteBox.bind(this);
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
        let boxNumber;
        
        if (Object.keys(boxList).length === 0) {
            boxNumber = 0;
        } else {
            let boxListIdx = boxList[boxList.length - 1].key
            boxNumber = parseInt(boxListIdx, 10) + 1;
        }

        textList[boxNumber] = "Write your text here"
        let inputBox = (
            <div key={boxNumber} id={`input-${boxNumber}`} className="input" style={{width: '85vw', display: 'flex'}}>
                <textarea
                    id={`text-${boxNumber}`}
                    className="input-text"
                    rows="5"
                    onChange={this.handleTextChange}
                    defaultValue={textList[boxNumber]}
                    style={{width: '80vw', border: '1px solid gray', marginBottom: '1vh'}}
                />
                <div style={{width: '2vw'}}>
                    <button 
                        id={`button-confirm-${boxNumber}`}
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '1vh', backgroundColor: 'green', borderRadius: '.25em', border: 'none', color: 'white'}}
                        onClick={this.convertBox}
                    >
                        <h3>V</h3>
                    </button>
                    <button 
                        id={`button-delete-${boxNumber}`}
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', backgroundColor: 'red', borderRadius: '.25em', border: 'none', color: 'white'}}
                        onClick={this.deleteBox}
                    >
                        <h3>X</h3>
                    </button>
                </div>
            </div>
        )
        
        boxList[boxNumber] = inputBox
        // boxList.push(inputBox)
        // textList.push("Write markdown Text in here")

        // console.log(textList)
        this.setState({
            boxList: boxList,
            textList: textList,
        })
    }

    deleteBox = e => {
        const boxNumber = (e.currentTarget.id).slice(-1);
        let textList = this.state.textList;
        let boxList = this.state.boxList;

        boxList = boxList.filter(el => el !== boxList[boxNumber])
        textList = textList.filter(el => el !== textList[boxNumber])
        console.log(textList)
        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        let that = this;

        let newTextList = newIndexList.map(function(x) {
            return (
                Object.values(textList)[x]
            )
        })
        console.log(newTextList)

        let newBoxList = newIndexList.map(function(x) {
            console.log(x)
            console.log(newTextList)
            console.log(newTextList[x])
            return (
            (typeList[x] === 'input') ? (
            <div key={x} id={`${typeList[x]}-${x}`} className="input" style={{width: '85vw', display: 'flex'}}>
                <textarea
                    id={`text-${x}`}
                    className="input-text"
                    rows="5"
                    onChange={that.handleTextChange}
                    defaultValue={newTextList[x]}
                    style={{width: '80vw', border: '1px solid gray', marginBottom: '1vh'}}
                />
                <div style={{width: '2vw'}}>
                    <button 
                        id={`button-confirm-${x}`}
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '1vh', backgroundColor: 'green', borderRadius: '.25em', border: 'none', color: 'white'}}
                        onClick={that.convertBox}
                    >
                        <h3>V</h3>
                    </button>
                    <button 
                        id={`button-delete-${x}`}
                        style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', backgroundColor: 'red', borderRadius: '.25em', border: 'none', color: 'white'}}
                        onClick={that.deleteBox}
                    >
                        <h3>X</h3>
                    </button>
                </div>
            </div>
        ) : (
            <div key={x} id={`${typeList[x]}-${x}`} className="output" style={{width: '80vw'}} onDoubleClick={that.convertBox}>
                <div 
                    id={`markdown-${x}`}
                    dangerouslySetInnerHTML={that.getRawMarkup(x)}
                    className="output-text"
                >
                </div>
            </div>
        ))})

        // console.log(newBoxList)

        this.setState({
            boxList: newBoxList,
            textList: newTextList,
        })
    }

    convertBox = e => {
        // if id == output -> double click becomes input
        // if id == input -> shift+enter becomes output
        e.preventDefault()
        if (e.currentTarget.className == 'output') {
            let boxList = this.state.boxList;
            let boxNumber = (e.currentTarget.id).slice(-1);
            let inputBox = (
                <div key={boxNumber} id={`input-${boxNumber}`} className="input" style={{width: '85vw', display: 'flex'}}>
                    <textarea
                        id={`text-${boxNumber}`}
                        className="input-text"
                        rows="5"
                        onChange={this.handleTextChange}
                        defaultValue={this.state.textList[boxNumber]}
                        style={{width: '80vw', border: '1px solid gray', marginBottom: '1vh'}}
                    />
                    <div style={{width: '2vw'}}>
                        <button 
                            id={`button-confirm-${boxNumber}`}
                            style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '1vh', backgroundColor: 'green', borderRadius: '.25em', border: 'none', color: 'white'}}
                            onClick={this.convertBox}
                        >
                            <h3>V</h3>
                        </button>
                        <button 
                            id={`button-delete-${boxNumber}`}
                            style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', backgroundColor: 'red', borderRadius: '.25em', border: 'none', color: 'white'}}
                            onClick={this.deleteBox}
                        >
                            <h3>X</h3>
                        </button>
                    </div>
                </div>
            )
            
            boxList[boxNumber] = inputBox;

            this.setState({
                boxList: boxList,
            })

        } else {
            let boxList = this.state.boxList;
            let boxNumber = (e.currentTarget.id).slice(-1);
            let outputBox = (
                <div key={boxNumber} id={`output-${boxNumber}`} className="output" style={{width: '80vw'}} onDoubleClick={this.convertBox}>
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
        
    }

    render() {
        const title = this.props.match.params.title;
        // console.log(this.state.textList)
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
                            <h3>+</h3>
                        </button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80vw', marginTop: '5vh', marginRight: '10vw'}}>
                        {Object.values(this.state.boxList)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;