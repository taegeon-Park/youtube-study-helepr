
import React, { Component } from 'react';
import Note from './Main/Note'
import './Main.css';
import store from '../store';
import httpGetConnection from '../modules/httpConnection/httpGetConnection';
import CURL from '../modules/url';
import httpJsonConnection from '../modules/httpConnection/httpJsonConnection';

export default class Main extends Component {
  mount = false;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      url: "",
    }

    store.subscribe(() => {
      if (this.mount) {
        this.setState(store.getState());
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }


  async componentDidMount() {
    this.mount = true;

    let _categoryCode = store.getState().categorySelected;
    if (_categoryCode !== false) {
      let url = `${CURL.url}getCategoryItems`;
      httpGetConnection(url, { userEmail: 'vrimd1017@gmail.com', categoryCode: _categoryCode },
        (responseJson) => {
          store.dispatch({
            type: "NOTES_LOADED",
            noteArr: responseJson
          })
        },
        () => { alert("Connection Fail") }
      )
    }
  }

  render() {
    let _onClickNoteCreateButton = (e) => {
      let NoteCreate = document.querySelectorAll('.Note-create');
      NoteCreate.forEach(element => {
        element.style.visibility = 'visible';
      })
    }

    let _onClickCancleButton = (e) => {
      let NoteCreate = document.querySelectorAll('.Note-create');
      NoteCreate.forEach(element => {
        element.style.visibility = 'hidden';
      });
    }

    let _onClickCreateButton = async (e) => {
      let url = `${CURL.url}insertNote`;
      let json = {
        'noteTitle': this.state.title,
        'noteContent': this.state.desc,
        'noteUrl': this.state.url,
        'noteCategory': store.getState().categorySelected
      }
      let response = httpJsonConnection(url, json,
        () => { }, () => { });
      store.dispatch({ type: 'EXTEND_MAIN', onExtendMain: false });
      store.dispatch({ type: 'SELECTED_CATEGORY', categorySelected: store.getState().categorySelected });
    }

    let mouseOut = false;

    let _onMouseOut = (e) => {
      mouseOut = true;
    }

    let _onMouseOver = (e) => {
      mouseOut = false;
    }

    let _onClickOuter = (e) => {
      if (mouseOut)
        _onClickCancleButton();
    }

    let _onChangeTitle = (e) => {
      this.setState({title: e.target.value});
    }

    let _onChangeDesc = (e) => {
      this.setState({desc: e.target.value});
    }

    let _onChangeURL = (e) => {
      this.setState({url: e.target.value});
    }

    let notes = [];
    notes = this.props.noteArr.map(
      note => (<Note key={note.noteCode} Note={note}></Note>)
    );
    return (
      <div className="Main">
        <div className="Note-craete-outer Note-create" onClick={_onClickOuter}></div>
        <div className="Note-create-in Note-create" onMouseOut={_onMouseOut} onMouseEnter={_onMouseOver}>
          <h1>Create NOTE</h1>
          <input type="text" value={this.state.title} onChange={_onChangeTitle} placeholder="Note title" />
          <input type="text" value={this.state.desc} onChange={_onChangeDesc} placeholder="Note Description" />
          <input type="text" value={this.state.url} onChange={_onChangeURL} placeholder="Video url" />
          <div className="Note-create-buttons">
            <button className="Note-create-button" onClick={_onClickCancleButton}>CANCLE</button>
            <button className="Note-create-button" onClick={_onClickCreateButton}>CREATE</button>
          </div>
        </div>
        <div className="Note-tool">
          <label className="button-layout">
            노트 생성
              <button className="tool-button" onClick={_onClickNoteCreateButton}>+</button>
          </label>
          <label className="button-layout">
            노트 삭제
          <button className="tool-button">-</button>
          </label>
        </div>
        {store.getState().categorySelected ?
          notes : <p>카테고리 선택해라옹</p>
        }
      </div>
    )
  }
}