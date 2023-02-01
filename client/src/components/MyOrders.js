import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import OrderInfo from './OrderInfo'
export default function MyOrders() {
    const [myOrders, setMyOrders] = useState([])


    const userId = JSON.parse(Cookies.get('user')).userId;
    useEffect(() => {
        getOrders();
    }, [])

    function getOrders() {
        fetch(`http://localhost:4000/order?id=${userId}`)
            .then(res => res.json())
            .then((data) => {
                setMyOrders(data);
            })
    }

    return (
        <div>
            {myOrders && myOrders.map((item) =>
                <OrderInfo getOrders = {getOrders} userId={userId} item={item} />
            )}
        </div>
    )
}
