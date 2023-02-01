import React from 'react'
export default function OrderTable(props) {
    let fullOrder = props.fullOrder;

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
