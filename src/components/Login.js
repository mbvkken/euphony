import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Login () {

    const [userReg, setUserReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {
        axios.post('http://localhost:3000/register', {
            username: userReg,
            password: passwordReg
        }).then((response) => {
            console.log(response);
        })
    }

    const login = () => {
        axios.post('http://localhost:3000/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
                console.log(response.data[0]);
            }
        })
    }
 
    return (
        <div className="App">
        <header className="App-header">
            <h2 style={{color: 'white'}}>euphony.</h2>
        </header>
        <div className="login-form">
            <div>
                <h1 style={{color: 'black'}}>Registration</h1>
                <label>Username</label>
                <input className="form-field" type="text" onChange={(e) => {
                    setUserReg(e.target.value);
                }} />
                <label>Password</label>
                <input className="form-field" type="password" onChange={(e) => {
                    setPasswordReg(e.target.value);
                }} />
                <button id="btn" onClick={register}>Register</button>
            </div>
            <div>
                <h1 style={{color: 'black'}}>Login</h1>
                <input className="form-field" type="text" placeholder="Username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input className="form-field" type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Link to="/"><button id="btn" onClick={login}>Login</button></Link>
            </div>
            <h1>{loginStatus}</h1>
        </div>
        </div>
    )
}

export default Login;