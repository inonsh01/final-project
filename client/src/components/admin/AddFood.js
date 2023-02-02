import React, { useState } from 'react'

export default function AddFood(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [url, setUrl] = useState("");

    async function addFood() {
        const obj = {
            name: name,
            price: price,
            type: type,
            img: url
        }
        const res = await fetch("http://localhost:4000/admin/food", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        if (res.status === 400) {
            const data = await res.text();
            alert(data);
            return;
        }
        props.getAllItems();
        props.setClickAdd(false)
    }

    return (
        <div>
            <li className="table-row">
                <div className="col col-1">
                    <p className='add-p'>Name</p>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name}></input>
                </div>
                <div className="col col-2">
                    <p className='add-p'>Price</p>
                    <input type='text' onChange={(e) => setPrice(e.target.value)} value={price}></input>
                </div>
                <div className="col col-3">
                    <p className='add-p'>Type</p>
                    <input type='text' onChange={(e) => setType(e.target.value)} value={type}></input>
                </div>
                <div className="col col-4">
                    <p className='add-p'>Image Url</p>
                    <input type='text' onChange={(e) => setUrl(e.target.value)} value={url}></input>
                </div>
            </li>
            <button onClick={addFood} className="submit-btn">Add</button>
        </div>
    )
}
