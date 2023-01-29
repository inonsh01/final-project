import { Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Home from './Home'
// import Login from './Login'
// import Register from './Register'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        
        <Route path='/home' element={<Home />}></Route>
        {/* <Router path = '/' element = {<Login />}></Router>
        <Router path = '/register' element = {<Register />}></Router> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
