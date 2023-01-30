import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (Cookies.get('user')) {
        Cookies.remove('user');
    }

    const user = {
        name: username,
        password: password
    }
    const sendReq = async (e) => {
        e.preventDefault()

        fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                if (data === "false") {
                    alert("User already exists");
                } else {
                    alert("You registered successfully");
                    navigate("/");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={(e) => sendReq(e)}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="login__input" placeholder="User name" minLength={4} maxLength={16} required />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="login__input" placeholder="Password" minLength={4} maxLength={16} required />
                        </div>
                        <button type='submit' className="button login__submit">
                            <span className="button__text">register</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                    <p className='log-in-btn'>Have an account? <NavLink className="log-in-link" to={"../"}>Log in</NavLink></p>
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

export default Register