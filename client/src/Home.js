import { Route,Link } from "react-router-dom";
function Home() {
    return(
        <>
        <h1>Home page</h1>
        <Link to = '/home'> home </Link> 
        </>
    )    
}


export default Home;