import React from 'react'
export default function OrderTable(props) {
    let fullOrder = props.fullOrder;

    return (
        <div className='table'>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">Amount</div>
                    <div className="col col-3">Price</div>
                </li>
                {fullOrder.map(row => (
                    <li key={row.id} className="table-row">
                        <div className="col col-1">{row.name}</div>
                        <div className="col col-2">{row.amount} g/b</div>
                        <div className="col col-3">{row.price}&#8362;</div>
                    </li>
                ))}
            </ul>
            <h3 className='total-price'>Total Price: {props.totalPrice}&#8362;</h3>
        </div>
    )
}
