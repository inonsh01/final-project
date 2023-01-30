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
    //const user = JSON.parse(Cookies.get('user'));
    //console.log('user: ', user);

    return (
        <div>
            <h2>doda</h2>
        </div>
    )
}




