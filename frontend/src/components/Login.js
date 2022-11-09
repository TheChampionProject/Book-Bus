import "../App.css";
import React from 'react';
import fire from './config/firebase'

class Login extends React.Component {

    // login() {

    // }

    // signUp() {

    // }

    render() {
        return(
            <div style={{textAlign: 'center'}}>
                <div>
                    <div>Email</div>
                    <input id="email" placeholder="Enter Email..." type="text"/>
                </div>
                <div>
                    <div>Password</div>
                    <input id="password" placeholder="Enter Passoword..." type="text"/>
                </div>
                <button style={{margin: '10px'}} onClick={this.login}>Login</button>
                <button style={{margin: '10px'}} onClick={this.SignUp}>SignUp</button>
            </div>
        )
    }
}

export default Login;