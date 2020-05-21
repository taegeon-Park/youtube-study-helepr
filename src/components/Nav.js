import React, {Component} from 'react';
import store from '../store';
import Category from './Nav/Category';
import './Nav.css';
import httpGetConnection from '../modules/httpConnection/httpGetConnection';
import CURL from '../modules/url';
import {FaExpandArrowsAlt, FaRegStickyNote} from 'react-icons/fa';
import {GiFootPlaster} from 'react-icons/gi';

export default class Nav extends Component {
  mount = false;
  constructor(props) {
    super(props);
    store.subscribe(()=>{
        if(this.mount) {
          this.setState(store.getState());
        }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.categoryArr === nextProps.categoryArr) 
        return false;
    return true;
  }

  componentDidMount() {
    this.mount = true;
    //let url ="http://localhost:9000";
    let url = CURL.url +"getusercategorylist";
    //let url =  "http://110.11.49.218:8080/myapp/getusercategorylist";
    httpGetConnection(url, {userEmail:'vrimd1017@gmail.com'}, 
     (responseJson)=>{
       store.dispatch({type:"CATEGORYS_LOAD", 
       categoryArr : responseJson
     })},
       () => {alert("Connection Fail")}
     ); 
  }
  
    render() { 

      let _onExtendNavMod =store.getState().onExtendNavMod;
      let _categoryArr = this.props.categoryArr;
      let _categoryList = [];

      if(_categoryArr !== undefined) {
         _categoryArr.forEach(element => {
            _categoryList.push(<Category key={element.categoryCode} category={element}/>);
         });
      }
      let onClickNavCategoryTab = e => {
          store.dispatch({type:'EXTEND_NAV', onExtendNavMod:  !_onExtendNavMod});
      }

      return(
        <div className="Nav">
          <FaRegStickyNote className="Nav-home"/>
          <FaExpandArrowsAlt 
            className="Nav-category-tab" onClick={onClickNavCategoryTab}/>
          <ul className="Nav-category-items">
              {_categoryList}
          </ul>
          <GiFootPlaster className="Nav-category-foot" />
        </div>
      )
    }
  }
  