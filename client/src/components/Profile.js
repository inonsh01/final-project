
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import '../styles/profile.css';

function Profile() {
    const [userInfo, setUserInfo] = useState('');
    const [edit, setEdit] = useState('');
    const [nameUpdate, setNameUpdate] = useState("");
    const [phoneUpdate, setPhoneUpdate] = useState("");
    const [emailUpdate, setEmailUpdate] = useState("");
    let userInfoJ = JSON.parse(Cookies.get('user'));

    useEffect(() => {
        getUserProfile();
    }, []);

    async function getUserProfile() {
        let result = await fetch(`http://localhost:4000/profile/${userInfoJ.userId}`)
        result = await result.json();
        setUserInfo(result);
        if (result[0].full_name) {
            setNameUpdate(result[0].full_name);
            setPhoneUpdate(result[0].phone_number);
            setEmailUpdate(result[0].email);
        }
    }

    async function updateInfoFunc() {
        // let user = userInfo[0];
        let response = await fetch(`http://localhost:4000/profile/${userInfoJ.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameUpdate,
                phone_number: phoneUpdate,
                email: emailUpdate
            })

        });
        response = await response.json();
        if (response) {
            alert(response);
            getUserProfile();
            return;
        }
        setEdit(false);
    }
    return (
        <>
            <h2>How are you  {userInfoJ.username} ?</h2>
            <br />
            {edit ? <><label>Name</label><input className="update-input" onChange={(e) => setNameUpdate(e.target.value)} type='text' value={nameUpdate}></input><br/></> : <h2> Name : {userInfo && nameUpdate}</h2>}
            {edit ? <><label>Phone</label><input  className="update-input"onChange={(e) => setPhoneUpdate(e.target.value)} type='text' value={phoneUpdate}></input><br/></> : <h2> Phone_Number : {userInfo && phoneUpdate}</h2>}
            {edit ? <><label>Email</label><input  className="update-input"onChange={(e) => setEmailUpdate(e.target.value)} type='text' value={emailUpdate}></input><br/></> : <h2> Email : {userInfo && emailUpdate}</h2>}
            <button onClick={() => setEdit(!edit)}>Edit info</button>
            <button onClick={updateInfoFunc}>save</button>
        </>
    )

}

export default Profile;