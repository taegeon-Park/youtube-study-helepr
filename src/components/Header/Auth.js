import React, {Component} from 'react';
import {BsPeopleCircle} from 'react-icons/bs';
import './Auth.css';

export default class Auth extends Component {
    render() {
      return(
        <div className="Auth">
            <BsPeopleCircle className="Auth-icon"/>
        </div>
      )
    }
}