import React, { useState, useEffect } from 'react'

export default function OrderInfo(props) {
    let item = props.item;
    const [info, setInfo] = useState([]);
    const [clicked, setClicked] = useState(false);
    function getDetails(orderId) {
        setClicked(!clicked)
        fetch(`http://localhost:4000/order?id=${props.userId}&&orderId=${orderId}`)
            .then(res => res.json())
            .then((data) => {
                setInfo(data);
                console.log(data);
            })
    }
    return (
        <div>
            <button onClick={() => getDetails(item.order_id)}>Order Id:{item.order_id} People: {item.people} Price: {item.price}&#8362;</button>
            <button onClick={() => getDetails(item.order_id)}></button>
            {clicked && info.map(obj =>
                <p style={{ backgroundColor: "white" }}>{obj.price}, {obj.amount}, {obj.food_name}</p>
            )}
        </div>
    )
}
