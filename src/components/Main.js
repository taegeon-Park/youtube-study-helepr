
import React, { Component } from 'react';
import Note from './Main/Note'
import './Main.css';
import store from '../store';
import httpGetConnection from '../modules/httpConnection/httpGetConnection';

export default class Main extends Component {
  mount = false;
  constructor(props) {
    super(props);
    

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
      let url = "http://110.11.49.218:8080/myapp/getCategoryItems";
      //let url = "http://localhost:9000/test2";
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
    let notes = [];
    notes = this.props.noteArr.map(
      note => (<Note key={note.noteCode} Note={note}></Note>)
    );

    return (
      <div className="Main">
        {store.getState().categorySelected ?
          notes : <p>카테고리 선택해라옹</p>
        }
      </div>
    )
  }
}