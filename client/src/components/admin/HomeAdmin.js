import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';
import TableRowAdmin from './TableRowAdmin';
import AddFood from './AddFood';

export default function HomeAdmin() {
    const [allItems, setAllItems] = useState([]);
    const [changeFood, setChangeFood] = useState(false);
    const [clickAdd, setClickAdd] = useState(false);
    const navigate = useNavigate();
    let userId;
    let userType;

    if (Cookies.get('user')) {
        let user = JSON.parse(Cookies.get('user'));
        userId = user.userId
        userType = user.type
    }
    useEffect(() => {
        getAllItems();
    }, []);

    function getAllItems() {
        fetch(`http://localhost:4000/admin?id=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    alert("You don't have permission to this page");
                    navigate(-1);
                    return;
                }
                setAllItems(data);
            })
    }

    if (userType !== 'admin')
        return;

    return (
        <div>
            <h1>Hello Administrator</h1>
            <button onClick={() => setChangeFood(!changeFood)}>Change Food</button>
            {changeFood && <div className="container-admin">
                <button onClick={() => setClickAdd(!clickAdd)}>Add Food</button>
                {clickAdd && <AddFood getAllItems={getAllItems} setClickAdd={setClickAdd} />}
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Name</div>
                        <div className="col col-2">Price</div>
                        <div className="col col-3">Type</div>
                        <div className="col col-4">Url Image</div>
                    </li>
                    {allItems.map((item) =>
                        <TableRowAdmin key={item.food_id} getAllItems={getAllItems} item={item} />
                    )}
                </ul>
            </div>}
        </div>
    )
}