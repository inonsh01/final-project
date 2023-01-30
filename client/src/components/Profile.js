
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'

function Profile() {
    const [userInfo, setUserInfo] = useState('');
    let userInfoJ = JSON.parse(Cookies.get('user'));

    useEffect(() => {
        async function getUserProfile() {
            let result = await fetch(`http://localhost:4000/profile/${userInfoJ.userId}`)
            result = await result.json();
            setUserInfo(result);
        }
        getUserProfile();
    }, []);

    return (
        <>
            <h2>How are you  {userInfoJ.username} ?</h2>
            <br />
            <h2> Name : {userInfo && userInfo[0].full_name}</h2>
            <h2> Phone number : {userInfo && userInfo[0].phone_number}</h2>
            <h2>Email : {userInfo && userInfo[0].email}</h2>
        </>
    )
}

export default Profile;