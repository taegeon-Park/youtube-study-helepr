import React, {Component} from 'react';
import Auth from './Header/Auth';
import Search from './Header/Search';
import './Header.css';

export default class Header extends Component {
    render() {
      return(
        <div className="Header">
            <Search></Search>
            <Auth></Auth>
        </div>
      )
    }
  }