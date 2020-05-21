import React, { Component } from 'react';
import Memo from './Memo';
import Youtube from 'react-youtube';
import httpGetConnection from '../../../modules/httpConnection/httpGetConnection';
import httpJsonConnection from '../../../modules/httpConnection/httpJsonConnection';
import CURL from '../../../modules/url';
import './NoteDetail.css';



export default class NoteDetail extends Component {
    state = {
        memoList: [],
        title: "This will be Title section",
        content: "This will be Content section",
        youtubePlayer: null
    }

    async componentDidMount() {
        let _noteCode = this.props.note.noteCode
        let _memoList = [];
        if (_noteCode !== undefined | null) {
            let url = CURL.url + "getNoteItems"
          _memoList = await httpGetConnection(url, { userEmail: 'vrimd1017@gmail.com', noteCode: _noteCode },
            () =>{}
            ,
            () => { alert("Connection Fail") }
          )
        }
        this.setState({memoList:_memoList});
    }

    render() {
        let memoIndex = -1;
        let onStateChangeId = null;

        let memosWithIndex = this.state.memoList.map(memo => Object.assign(memo, { index: ++memoIndex }))
        let _onReady = (e) => {
            this.setState({youtubePlayer: e.target});
            e.target.playVideo();
            const memoList = document.getElementById("memoList");
            memoList.value = e.target;
            onStateChangeId = true;
            setTimeout(_onTimeChange(e.target), 100);
        }

        let _memoListUpdate = (_memoList) => {
            this.setState({memoList: _memoList});
        }

        let onClickMemoAdd = async (e) => {
            if (this.state.youtubePlayer !== null) {
                let url = CURL.url + 'insertMemo2';
                let currentTime = Number.parseInt(this.state.youtubePlayer.getCurrentTime());
                let redup = false;
                for(let i=0; i<memosWithIndex.length; i++) {
                    if(currentTime===Number.parseInt(memosWithIndex[i].memoTime)) redup = true;
                }
                if(redup) {alert("reduplication"); return;}
                let _memo= { memoTitle: this.state.title, 
                             memoContent:this.state.content, 
                             memoTime:currentTime,
                             noteCode: Number.parseInt(this.props.noteCode)
                            };
                //JSON.stringify(_memo);
                let _newMemoList = await httpGetConnection(url, _memo,
                   ()=>{},
                   ()=>{});

                if(_newMemoList)
                   _memoListUpdate(_newMemoList);
            }
        }

        let _onChangeTitle = (e) => {
            this.setState({
                title: e.target.value
            });
        }
        let _onChageContent = (e) => {
            this.setState({
                content: e.target.value
            });
        }

        let _onChangeVideoTime = (index) => {
            this.setState({
                title: memosWithIndex[index].memoTitle,
                content: memosWithIndex[index].memoContent
            });
            memoIndex = index;
        }

        let _onStateChange = (e) => {
            onStateChangeId = false;
            let cState = e.target.getPlayerState();
            switch(cState) {
                case -1:
                    // 시작되지 않음
                    break;
                case 0:
                    // 종료
                    break;
                case 1:
                    onStateChangeId=true; setTimeout(_onTimeChange(e.target), 100);
                    // 재생중
                    break;
                case 2:
                    // 일시중지
                    break;
                case 3:
                    // 버퍼링
                    break;
                case 5:
                    // 버퍼링
                    break
                default:
                    break;
            }
        }
        

        let _onTimeChange = (youtubeVideoPlayer) => {
            let clearTime = setInterval(() => {
                    if(!onStateChangeId) clearTimeout(clearTime);
                    let cTime = Number.parseInt(youtubeVideoPlayer.getCurrentTime());
                    let cMemo = memosWithIndex.map(memo => memo).filter(memo => memo.memoTime === cTime);
                    if (cMemo.length > 0) {
                        this.setState({
                            title: cMemo[0].memoTitle,
                            content: cMemo[0].memoContent
                        });
                    }
                }, 500);
        }

        let memoArray = memosWithIndex.map(memo => <Memo onStateChange={_onChangeVideoTime} memoListUpdate={_memoListUpdate} key={memo.memoCode} memo={memo} />);
        return (
            <div className="NoteDetail">
                <div className="YoutubeVideo">
                    <Youtube className="YoutubeVideoI" videoId={this.props.note.noteURL} onReady={_onReady} onStateChange={_onStateChange} />
                    <div className="current-memo">
                        <div>
                            <input className="current-memo-title common" 
                                 onChange={_onChangeTitle} value={this.state.title}></input>
                            <input className="current-memo-content common" 
                                 onChange={_onChageContent} value={this.state.content}></input>
                        </div>
                        <button className="memo-add-button" onClick={onClickMemoAdd}>ADD</button>
                    </div>
                </div>
                <div id="memoList" className="MemoList" value="">
                    {memoArray}
                </div> 
            </div>
        )
    };
}