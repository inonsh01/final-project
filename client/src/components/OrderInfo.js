import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import '../styles/OrderInfo.css'

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
                <div className='order_info' key={Math.random()}>
                    <ul className="order-info-ul">
                        <li className="table-header">
                            <div className="col">Name: {obj.food_name}</div>
                            <div className="col">Price: {obj.price}&#8362;</div>
                            <div className="col">Amount: {obj.amount} g/b</div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
