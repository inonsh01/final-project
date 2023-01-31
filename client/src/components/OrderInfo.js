import React from 'react'

export default function OrderInfo(props) {
    let item = props.item
    function getDetails(id){
        console.log(id);
    }
    return (
        <div>
            <button onClick={()=>getDetails(item.order_id)}>Order Id:{item.order_id}: Price: {item.price}&#8362;</button>
        </div>
    )
}
