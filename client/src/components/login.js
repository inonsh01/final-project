import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import '../styles/login.css'

export default function Login() {
    const { username, setUsername } = useContext(AppContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    if (localStorage.getItem('currentUser', username)) {
        localStorage.removeItem('currentUser', username)
    }

    function sendReq(e) {
        e.preventDefault();
        const user = {
            name: name,
            password: password
        }
        fetch("http://localhost:4000/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => response.text())
            .then(data => {
                if (data === "false") {
                    alert("your username or password are incorrect");
                    window.location.reload();
                }
                else {
                    setUsername(name);
                    localStorage.setItem('currentUser', name);
                    navigate(`/${name}`);
                }
            })
    }
    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={(e) => sendReq(e)}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="login__input" placeholder="User name" minLength={4} maxLength={16} required />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="login__input" placeholder="Password" minLength={4} maxLength={16} required />
                        </div>
                        <button type='submit' className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>

                    </form>
                    <p className='log-in-btn'>Don't have an account? <NavLink className="log-in-link" to={"../register"}>Register</NavLink></p>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}
