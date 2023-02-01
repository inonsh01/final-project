import React, { useState, useEffect } from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function OrderInfo(props) {
    let item = props.item;
    const [info, setInfo] = useState([]);
    const [clicked, setClicked] = useState(false);

    async function getDetails(orderId) {
        const res = await fetch(`http://localhost:4000/order?id=${props.userId}&&orderId=${orderId}`)
        const data = await res.json();
        setInfo(data);
        setClicked(!clicked)
    }
    async function deleteOrder(id) {
        await fetch(`http://localhost:4000/order?id=${id}`, {
            method: 'DELETE'
        })
        props.getOrders();
    }
    return (
        <div>
            <button onClick={() => getDetails(item.order_id)}>Order Id:{item.order_id} People: {item.people} Price: {item.price}&#8362;</button>
            <button onClick={() => deleteOrder(item.order_id)}><FaTrashAlt /></button>
            {clicked && info.map(obj =>
                <p style={{ backgroundColor: "white" }}>{obj.price}, {obj.amount}, {obj.food_name}</p>
            )}
        </div>
    )
}
