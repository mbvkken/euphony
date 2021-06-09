import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Login () {

    const [userReg, setUserReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    axios.defaults.withCredentials = true;

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

    useEffect(() => {
        axios.get('http://localhost:3000/login').then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].username)  
              }
        })
    }, [])
 
    return (
        <div className="App">
        
        <div className="login-form">
            <div>
                <h1>Registration</h1>
                <label>Username</label>
                <input className="form-field" type="text" onChange={(e) => {
                    setUserReg(e.target.value);
                }} />
                <label>Password</label>
                <input className="form-field" type="password" onChange={(e) => {
                    setPasswordReg(e.target.value);
                }} />
                <Link to="/"><button id="btn" onClick={register}>Sign up</button></Link>
            </div>
            <div>
                <h1>Login</h1>
                <input className="form-field" type="text" placeholder="Username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <input className="form-field" type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Link to="/">
                    <button id="btn" onClick={login}>Log in</button>
                </Link>
            </div>
            <h1>{loginStatus}</h1>
        </div>
        </div>
    )
}

export default Login;