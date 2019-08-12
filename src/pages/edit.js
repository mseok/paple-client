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
            text: "# Change header text by double clicking cell.",
            focusingBox: "",
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

    componentDidMount(){
        if (this.state.focusingBox !== "") {
            this.state.focusingBox.focus(); 
            console.log(this.state.focusingBox)
        }
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
                onKeyDown={ e => {
                    if (e.shiftKey) {
                        if (e.keyCode === 13) {
                            console.log('success')
                            e.preventDefault()
                            return false
                        }
                    }
                }}
                onKeyUp={ e => {
                    if (e.shiftKey && e.keyCode === 13) {
                        window.document.getElementById(`button-confirm-${index}`).click()
                    }}
                }
            />
            <div style={{width: '2vw'}}>
                <button 
                    id={`button-confirm-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '.5vh', background: 'none', border: 'none', color: 'white'}}
                    onClick={this.convertBox}
                >
                    ⭕
                </button>
                <button 
                    id={`button-delete-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '.5vh', background: 'none', border: 'none', color: 'white'}}
                    onClick={this.deleteBox}
                >
                    ❌
                </button>
                <button 
                    id={`button-up-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', marginBottom: '.5vh', background: 'none', border: 'none', color: 'white'}}
                    onClick={this.upBox}
                >
                    ⬆
                </button>
                <button 
                    id={`button-down-${index}`}
                    style={{width: '2vw', height: '2vw', marginLeft: '0.5vw', background: 'none', border: 'none', color: 'white'}}
                    onClick={this.downBox}
                >
                    ⬇
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

    addHeader = () => {
        const boxList = this.state.boxList;
        const textList = this.state.textList;
        let boxNumber;
        
        if (Object.keys(boxList).length === 0) {
            boxNumber = 0;
        } else {
            let boxListIdx = boxList[boxList.length - 1].key
            boxNumber = parseInt(boxListIdx, 10) + 1;
        }

        let outputBox = this.getOutputBox(boxNumber, this.state.text)
        
        boxList[boxNumber] = outputBox
        textList[boxNumber] = this.state.text

        this.setState({
            boxList: boxList,
            textList: textList,
        })
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
        let boxList = this.state.boxList;
        let textList = this.state.textList;
        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);
        
        if (boxList.length >= 2 && boxNumber !== 0) {
            this.switch("upper", textList, boxNumber)
            this.switch("upper", typeList, boxNumber)

            let newTextList = newIndexList.map(x => Object.values(textList)[x])
            let newBoxList = newIndexList.map(
                x => ((typeList[x] === 'input') ? this.getInputBox(x, newTextList[x]) : this.getOutputBox(x, newTextList[x]))
            )
            
            this.setState({
                boxList: newBoxList,
                textList: newTextList,
                focusingBox: newBoxList[boxNumber - 1],
            })
        }
    }

    downBox = e => {
        let boxList = this.state.boxList;
        let textList = this.state.textList;
        let typeList = Object.values(boxList).map(x => x.props.id.split("-")[0]);
        let newIndexList = Array.from(Array(boxList.length).keys());
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);

        if (boxList.length >= 2 && boxNumber !== boxList.length) {
            this.switch("downer", textList, boxNumber)
            this.switch("downer", typeList, boxNumber)

            let newTextList = newIndexList.map(x => Object.values(textList)[x])
            let newBoxList = newIndexList.map(
                x => ((typeList[x] === 'input') ? this.getInputBox(x, newTextList[x]) : this.getOutputBox(x, newTextList[x]))
            )

            this.setState({
                boxList: newBoxList,
                textList: newTextList,
            })
        }
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

        let inputBox = this.getInputBox(boxNumber, "")
        
        boxList[boxNumber] = inputBox
        textList[boxNumber] = ""

        this.setState({
            boxList: boxList,
            textList: textList,
        })
    }

    deleteBox = e => {
        const boxNumber = parseInt((e.currentTarget.id).slice(-1), 10);
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
                                            console.log(respObj.page.render)
                                            window.location.replace(`/main/${id}`)
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
                    <div style={{width: '10vw', marginTop: '5vh', marginLeft: '5vw', display: 'flex', flexDirection: 'column'}}>
                        <button 
                            style={{width: '6vw', height: '3vw', margin: '0.5vw 2vw', backgroundColor: '#303030', borderRadius: '.25em', border: 'none', color: 'white'}}
                            onClick={this.addHeader}
                        >
                            Add Header
                        </button>
                        <button 
                            style={{width: '6vw', height: '3vw', margin: '1vw 2vw', backgroundColor: '#303030', borderRadius: '.25em', border: 'none', color: 'white'}}
                            onClick={this.addBox}
                        >
                            Add Content
                        </button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80vw', marginTop: '5vh', marginRight: '5vw'}}>
                        <Query query={PAGE_QUERY} variables={{ pageId: id }} onCompleted={data => this.setData(data.pages.single.content)}>
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