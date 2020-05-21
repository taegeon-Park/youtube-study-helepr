import React, { Component } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import httpGetConnection from '../../../modules/httpConnection/httpGetConnection';
import CURL from '../../../modules/url';
import './Memo.css';

export default class Memo extends Component {
    state = {
        title: this.props.memo.memoTitle,
        content: this.props.memo.memoContent
    }

    render() {
        let memo = this.props.memo;
        let _onClickMemoVideoTime = (e) => {
            e.preventDefault();
            const memoList = document.getElementById("memoList")
            if (memoList.value !== "") {
                memoList.value.seekTo(memo.memoTime);
            }
        }

        let _onDeleteClick = async (e) => {
            let url = CURL.url + 'deleteMemo';
            let _memo = {
                memoCode: Number.parseInt(memo.memoCode),
                noteCode: Number.parseInt(memo.noteCode)
            }
            let _newMemoList = await httpGetConnection(url, _memo,
                () => { },
                () => { });

            if (_newMemoList)
                this.props.memoListUpdate(_newMemoList);
        }

        let _onUpdateDivClick = (e) => {
            const modify = document.getElementById(`Memo-modify-${memo.memoCode}`);
            const real = document.getElementById(`Memo-real-${memo.memoCode}`);
            if (modify.style.display === 'none') {
                real.style.display = 'none'
                modify.style.display = 'flex';
            } else {
                modify.style.display = 'none';
                real.style.display = 'flex';
            }
        }

        let _onUpdateClick = async (e) => {
            const modify = document.getElementById(`Memo-modify-${memo.memoCode}`);
            const real = document.getElementById(`Memo-real-${memo.memoCode}`);
            
            let url = CURL.url + 'updateMemo';
            let _memo = {
                memoTitle: this.state.title,
                memoContent: this.state.content,
                memoCode: Number.parseInt(memo.memoCode),
                noteCode: Number.parseInt(memo.noteCode)
            }
            let _newMemoList = await httpGetConnection(url, _memo,
                () => { },
                () => { });
            if (_newMemoList)
                this.props.memoListUpdate(_newMemoList);
            modify.style.display = 'none';
            real.style.display = 'flex';
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
        let memoHour = Number.parseInt(memo.memoTime / 60);
        if(memoHour<10) memoHour = '0' + memoHour;
        let memoMin = memo.memoTime % 60;
        if(memoMin<10) memoMin = '0' + memoMin;

        return (
            <div className="Memo">
                <div id={"Memo-modify-"+ memo.memoCode} className="Memo-modify">
                    <input className="current-memo-title common"
                        onChange={_onChangeTitle} value={this.state.title}></input>
                    <input className="current-memo-content common"
                        onChange={_onChageContent} value={this.state.content}></input>
                    <button onClick={_onUpdateClick}>update</button>
                </div>
                <div id={"Memo-real-"+ memo.memoCode} className="Memo-real">
                    <div className="MemoTitle">
                        {memo.memoTitle}
                    </div>
                    <div className="MemoDesc">{memo.memoContent}</div>
                </div>
                <div className="Memo-etc">
                    <a href="/content" className="MemoVideoTime" onClick={_onClickMemoVideoTime} dataset={{ value: memo.memoVideoTime }}>
                        <div value={memo.memoTime}>{`${memoHour}:${memoMin}`} </div>
                    </a>
                    <button className="update Memo-button" onClick={_onUpdateDivClick}><GrUpdate   /></button>
                    <button className="delete Memo-button" onClick={_onDeleteClick}><AiFillDelete  /></button>
                </div>
            </div>
        )
    }
}