import "../App.css";
import React from "react";

export default function Login() {
    const SignUp = () => {};
    const login = () => {};

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <h1>Email</h1>
                <input id="email" placeholder="Enter Email..." type="text" />
            </div>
            <div>
                <h1>Password</h1>
                <input
                    id="password"
                    placeholder="Enter Passoword..."
                    type="text"
                />
            </div>
            <button style={{ margin: "10px" }} onClick={login}>
                Login
            </button>
            <button style={{ margin: "10px" }} onClick={SignUp}>
                SignUp
            </button>
        </div>
    );
}
