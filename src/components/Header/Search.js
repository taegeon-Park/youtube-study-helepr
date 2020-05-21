import React, {Component} from 'react';
import {RiSearchLine} from 'react-icons/ri';
import './Search.css';

export default class Search extends Component {
    render() {
      return(
            <div className="Search">
                <input className="Search-text" type="text"></input>
                <RiSearchLine className="Search-logo"/>
            </div>
      )
    }
  }