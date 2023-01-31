import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
export default function OrderTable(props) {
    let fullOrder = props.fullOrder;
    let userId = JSON.parse(Cookies.get('user')).userId;

    useEffect(() => {
        props.orderTableRef.current = sendOrderToServer;
    }, [])

    function sendOrderToServer(order, price) {
        fetch(`http://localhost:4000/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullOrder: order, userId: userId, totalPrice: price })
        })
            .then((response) => response.json())
            .then(data => {
                console.log('data: ', data);
            });
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>amount</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {fullOrder.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.amount} g/b</td>
                            <td>{row.price}&#8362;</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total Price: {props.totalPrice}&#8362;</h3>
        </div>
    )
}
