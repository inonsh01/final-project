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
    console.log(userInfo);

    //const user = JSON.parse(Cookies.get('user'));
    //console.log('user: ', user);

    return (
        <div>
            <button onClick={()=>navigate(`order`)}>click</button>
            <h2>doda</h2>
            <h2> welcome back {userInfo.username}!</h2>
        </div>
    )
}



