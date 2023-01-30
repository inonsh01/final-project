import Home from './components/Home'
import Register from "./components/register";
import Login from './components/login';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

export const AppContext = createContext();

function App() {
  const [username, setUsername] = useState();
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ username, setUsername }}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path=':name/home' element={<Home />}></Route>
          <Route path="*" element={<h1>404 Not found</h1>}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
