import { Route, Link, useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { useContext } from "react";



function Home() {
    const { setUsername } = useContext(AppContext);
    const navigate = useNavigate();
    let username = localStorage.getItem("currentUser");

    function Logout() {
        localStorage.clear();
        setUsername("");
        navigate('/');
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = window.history.go(1);
    };

    return (
        <>
            <h1>how are you doing {username} it's from the</h1>
            <Link to={`/${username}/home`} > home </Link>
            <button onClick={Logout}> לך הביתה שלך</button>
        </>
    )
}


export default Home;

