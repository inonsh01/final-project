import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get('user')) {
            navigate("/");
            return;
        }
    }, []);
    if (!Cookies.get('user')) {
        return;
    }

    let userInfo = JSON.parse(Cookies.get('user'));

    return (
        <div>
            <h1>Hello {userInfo.username}, Welcome to Niso-Grill</h1>
            <br></br>
            <button onClick={()=>navigate(`order`)}>Make a new order </button>
        </div>
    )
}



