import React, { Component } from 'react';
import httpJsonConnection from '../modules/httpConnection/httpJsonConnection';
import CURL from '../modules/url';
import store from '../store';

import './Login.css';

export default class extends Component {
    state = {
        useremail: "",
        password: "",
    }
    render() {
        let _onChangeEmail = (e) => {
            this.setState({ useremail: e.target.value });
        }

        let _onChangePassword = (e) => {
            this.setState({ password: e.target.value });
        }

        let _onLoginSubmitClick = (e) => {
            e.preventDefault();
            let url = `${CURL.url}login`;
            let json = {
                userEmail: e.target.elements[0].value,
                userPassword: e.target.elements[0].value
            }
            let response = httpJsonConnection(url, json,
                () => { }, () => { });
            response.then(res => {
                alert(res.Message);
                if (res.ResponseCode === 200) {
                    store.dispatch({ type: 'LOGIN', login: true });
                }
            });
        }

        let _onSignSubmitClick = (e) => {
            e.preventDefault();
            let url = `${CURL.url}registUser`;
            let json = {
                userEmail: e.target.elements[0].value,
                userPassword: e.target.elements[0].value
            }
            let response = httpJsonConnection(url, json,
                () => { }, () => { });
            response.then(res => {
                alert(res.Message);
                if (res.ResponseCode === 200) {
                    document.getElementById('')
                    const SignForm = document.getElementById('SignForm');
                    SignForm.style.visibility = 'hidden';
                }
            });
        }

        let _onClickSignButton = (e) => {
            const SignForm = document.getElementById('SignForm');
            SignForm.style.visibility = 'visible';
        }

        let _onClickCancleButton = (e) => {
            const SignForm = document.getElementById('SignForm');
            SignForm.style.visibility = 'hidden';
        }

        return (
            <div className="Login" >
                <span className="outerForm"></span>
                <form className="LoginForm" src="/content" method="POST" onSubmit={_onLoginSubmitClick}>
                    <h1>LOGIN</h1>
                    <div className="textbox">
                        <label>
                            Email:
                    <input className="email input" type="text" value={this.state.useremail}
                                onChange={_onChangeEmail} placeholder="useremail@example.com" />
                        </label>
                    </div>
                    <div className="textbox">
                        <label>
                            Password:
                    <input className="password input" type="password" value={this.state.password}
                                onChange={_onChangePassword} />
                        </label>
                    </div>
                    <div style={{ display: "flex" }}>
                        <input className="sign input" tpye="button" value="SIGNUP" onClick={_onClickSignButton} />
                        <input className="submit input" type="submit" value="GO" />
                    </div>
                </form>
                <form id="SignForm" className="SignForm" src="/content" method="POST" onSubmit={_onSignSubmitClick}>
                    <h1>SIGN</h1>
                    <div className="textbox" >
                        <label>
                            Email:
                    <input className="email input" type="text" value={this.state.useremail}
                                onChange={_onChangeEmail} placeholder="useremail@example.com" />
                        </label>
                    </div>
                    <div className="textbox">
                        <label>
                            Password:
                    <input className="password input" type="password" value={this.state.password}
                                onChange={_onChangePassword} />
                        </label>
                    </div>
                    <div styel={{ display: "flex" }}>
                        <input className="sign input" tpye="button" value="CANCEL" onClick={_onClickCancleButton} />
                        <input className="submit input" type="submit" value="SIGNUP" />
                    </div>
                </form>
            </div>
        )
    }
}