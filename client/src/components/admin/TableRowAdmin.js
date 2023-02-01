import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

export default function TableRowAdmin(props) {
    const item = props.item;
    const [clickName, setClickName] = useState(false);
    const [clickPrice, setClickPrice] = useState(false);
    const [clickType, setClickType] = useState(false);
    const [clickUrl, setClickUrl] = useState(false);

    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [type, setType] = useState(item.type);
    const [url, setUrl] = useState(item.img);

    async function sendToServer() {
        const obj = {
            data: {
                name: name,
                price: price,
                type: type,
                img: url
            },
            foodId: item.food_id
        }
        await fetch("http://localhost:4000/admin/food", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        props.getAllItems();
        setClickName(false);
        setClickPrice(false);
        setClickType(false);
        setClickUrl(false);
    }

    async function Cancel() {
        setName(item.name);
        setPrice(item.price);
        setType(item.type);
        setUrl(item.img);
        setClickName(false);
        setClickPrice(false);
        setClickType(false);
        setClickUrl(false);
    }

    async function deleteFood() {
        await fetch(`http://localhost:4000/admin/food?id=${item.food_id}`, {
            method: 'DELETE'
        })
        props.getAllItems();
    }

    return (
        <div>
            <li key={item.food_id} className="table-row">
                <div className="col col-1">
                    {clickName ?
                        <input onChange={(e) => setName(e.target.value)} type='text' value={name}></input> :
                        <button onClick={() => setClickName(true)} className='btn-as-txt'>{name}</button>}
                </div>

                <div className="col col-2">
                    {clickPrice ?
                        <input onChange={(e) => setPrice(e.target.value)} type='text' value={price}></input> :
                        <button onClick={() => setClickPrice(true)} className='btn-as-txt'>{price}&#8362;</button>}
                </div>

                <div className="col col-3">
                    {clickType ?
                        <input onChange={(e) => setType(e.target.value)} type='text' value={type}></input> :
                        <button onClick={() => setClickType(true)} className='btn-as-txt'>{type}</button>}
                </div>

                <div className="col col-4">
                    {clickUrl ?
                        <input onChange={(e) => setUrl(e.target.value)} type='text' value={url}></input> :
                        <button onClick={() => setClickUrl(true)} className='btn-as-txt'>{url}</button>}
                </div>
                <button onClick={deleteFood} className='btn-as-txt' ><FaTrashAlt /></button>
                {(clickName || clickPrice || clickType || clickUrl) &&
                    <>
                        <button style={{ marginRight: "10px", boxShadow: "2px 2px 1px black" }} className='btn-as-txt' onClick={Cancel} >Cancel</button>
                        <button style={{ boxShadow: "2px 2px 1px black" }} className='btn-as-txt' onClick={sendToServer} >Send</button>
                    </>}
            </li>
        </div>
    )
}
