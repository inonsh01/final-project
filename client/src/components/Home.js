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
    console.log("sssssssssssss");
    //console.log('user: ', user);

    return (
        <div>
            <button onClick={()=>navigate(`order`)}>click</button>
            <h2>doda</h2>
        </div>
    )
}




