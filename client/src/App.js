import Home from './components/Home'
import Register from "./components/register";
import Login from './components/login';
import Navbar from './components/Navbar';
import Order from './components/Order';
import About from './components/About';
import Profile from './components/Profile';
import MyOrders from './components/MyOrders';
import HomeAdmin from './components/admin/HomeAdmin';
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
          <Route path='home/admin' element={<HomeAdmin />}></Route>
          <Route path='home' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="order" element={<Order />}></Route>
            <Route path="myOrders" element={<MyOrders />}></Route>
          </Route>
          <Route path="*" element={<h1>404 Not found</h1>}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter >
  );
}

export default App;
