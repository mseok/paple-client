import React, { Component } from 'react';
import _ from 'lodash';
import markdownToHTML from '../lib/markdownEditor';
import { Query, Mutation } from 'react-apollo';
import { PAGE_QUERY, PAGE_CREATE_MUTATION } from '../queries';
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/styles.css";
import replacePathSepForGlob from 'jest-util/build/replacePathSepForGlob';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boxList: [],
            textList: [], 
            isFirst: true,
        }

        this.addBox = this.addBox.bind(this);
        this.deleteBox = this.deleteBox.bind(this);
        this.convertBox = this.convertBox.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.getInputBox = this.getInputBox.bind(this);
        this.getOutputBox = this.getOutputBox.bind(this);
    }

    setData = data => {
        if (this.state.isFirst) {
            let initialTextList = [];
            let initialBoxList = [];
            initialTextList[0] = data;
            initialBoxList[0] = this.getOutputBox(0, data);
            this.setState({
                textList: initialTextList,
                isFirst: false,
                boxList: initialBoxList,
            })
        }
    }

    getInputBox = (index, text) => (
        <div key={index} id={`input-${index}`} className="input" style={{width: '85vw', display: 'flex'}}>
            <textarea
                id={`text-${index}`}
                className="input-text"
                rows="5"
                onChange={this.handleTextChange}
                autoFocus
                placeholder="Write your text here"
                value={text}
                style={{width: '80vw', border: '1px solid gray', marginBottom: '1vh'}}
                onKeyUp={ e => {
                    if (e.key === 'Enter' && e.shiftKey) {
                        window.document.getElementById(`button-confirm-${index}`).click()
                    }}
                }
            />
            <div style={{width: '2vw'}}>
                <button 
                    id={`button-confirm-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '1vh', backgroundColor: 'green', borderRadius: '.25em', border: 'none', color: 'white'}}
                    onClick={this.convertBox}
                >
                    <h3>V</h3>
                </button>
                <button 
                    id={`button-delete-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', backgroundColor: 'red', borderRadius: '.25em', border: 'none', color: 'white'}}
                    onClick={this.deleteBox}
                >
                    <h3>X</h3>
                </button>
            </div>
        </div>
    )

    getOutputBox = (index, text) => (
        <div key={index} id={`output-${index}`} className="output" style={{width: '80vw'}} onDoubleClick={this.convertBox}>
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
        let textList = this.state.textList;
        let boxList = this.state.boxList;
        let boxNumber = (e.target.id).slice(-1);

        textList[boxNumber] = e.target.value;

        boxList[boxNumber] = this.getInputBox(boxNumber, textList[boxNumber])

        await this.setState({
            textList: textList,
            boxList: boxList,
        })
    }

    addBox = () => {
        const boxList = this.state.boxList;
        const textList = this.state.textList;
        let boxNumber;
        
        if (Object.keys(boxList).length === 0) {
            boxNumber = 0;
        } else {
            let boxListIdx = boxList[boxList.length - 1].key
            boxNumber = parseInt(boxListIdx, 10) + 1;
        }

        let inputBox = this.getInputBox(boxNumber, this.state.text)
        
        boxList[boxNumber] = inputBox
        textList[boxNumber] = ""

        this.setState({
            boxList: boxList,
            textList: textList,
        })
    }

    deleteBox = e => {
        const boxNumber = (e.currentTarget.id).slice(-1);
        let textList = this.state.textList;
        let boxList = this.state.boxList;

        boxList = boxList.slice(0, boxNumber).concat(boxList.slice(boxNumber + 1, boxList.length))
        textList = textList.slice(0, boxNumber).concat(textList.slice(boxNumber + 1, textList.length))

        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        let that = this;

        let newTextList = newIndexList.map(x => Object.values(textList)[x])
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

        return (
            <div>
                <header
                    className="site-header"
                    style={{margin: '0', minWidth: '1240px', background: '#303030', color: 'white', display: 'flex', justifyContent: 'space-between'}}
                >
                    <h1 style={{marginLeft: '20px'}}>{title}</h1>
                    <Mutation mutation={PAGE_CREATE_MUTATION}>
                        {mutate => (
                            <button 
                                className="btn btn-primary" 
                                id="button-signout" 
                                type="button" 
                                style={{borderColor: 'white', backgroundColor: '#303030', color: 'white', borderRadius: '.25rem', margin: '10px', marginRight: '20px', height: '38px'}}
                                onClick={async () => {
                                    const response = await mutate({
                                        variables: { pageId: id, content: textContents }
                                    })
                                    let respObj = _.get(response, 'data.pages.update', {})
                                    if (respObj.responseResult.succeeded) {
                                        _.delay(() => {
                                            // window.location.replace(`/main/${id}`)
                                            return
                                        })
                                    }
                                }}
                            >
                                저장하기
                            </button>
                        )}
                    </Mutation>
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
                        <Query query={PAGE_QUERY} variables={{ pageId:id }} onCompleted={data => this.setData(data.pages.single.content)}>
                            {({ loading, data, error }) => {
                                if (loading) return "loading"
                                if (error) return {error}
                                return Object.values(this.state.boxList)
                            }}
                        </Query>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;