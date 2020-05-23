import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import WholeNavModal from './components/WholeNavModal';
import Login from './components/Login';

import './App.css';
import store from './store';

class App extends Component {
  mount = false;
  constructor(props) {
    super(props);
    this.state = {
      onExtendNavMod: false,
      onExtendMain: false,
      categoryArr: [],
      noteArr: [],
      categorySelected: false,
      login: false,
    }

    store.subscribe(function () {
      if (this.mount === true) {
        this.setState(store.getState())
      }
    }.bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.categorySelected === false && nextState.categorySelected === false)
      return true;
    if (this.state.categorySelected !== nextState.categorySelected) {
      return true;
    }
    if (this.state === nextState) return false;
    return true;
  }

  componentDidMount() {
    this.mount = true;
  }

  componentDidUpdate() {
    if (this.state.categorySelected !== false && this.state.onExtendMain === false) {
      store.dispatch({ type: "EXTEND_MAIN", onExtendMain: true })
    }
  }

  render() {
    return (
      <div className="App">
        {
          (() => {
            if (this.state.login) {
              return (
                <body>
                  <Header></Header>
                  <Nav categoryArr={this.state.categoryArr}></Nav>
                  {this.state.onExtendMain ? <Main noteArr={this.state.noteArr}></Main> : <div style={{marginLeft: '100px'}}>category 생성or선택</div>}
                  {this.state.onExtendNavMod ? <WholeNavModal categoryArr={this.state.categoryArr} /> : null}
                </body>
              )
            } else {
              return(
                <Login/>
              )
            }
          })()
        }
      </div>
    )
  }
}

export default App;
