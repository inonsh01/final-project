import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import '../styles/NavBar.css';
import Cookies from 'js-cookie';


export default function Navbar() {
    const navigate = useNavigate();

    function Logout() {
        Cookies.remove('user');
        navigate('/');

    }

    return (<>
        <div className='navbar'>

            <Link to='/home' className='links' >Home</Link>
            <Link to='order' className='links' >New Order</Link>
            <Link to='profile' className='links' >Profile</Link>
            <Link to='myOrders' className='links' >My Orders</Link>
            <Link to='about' className='links' >About Us</Link>
            <button className='logout' onClick={Logout}>Logout</button>

        </div>
        <Outlet />
    </>
    )
}
