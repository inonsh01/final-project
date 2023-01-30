import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';

export default function Order() {
    const [food, setFood] = useState();
    const [alcohol, setAlcohol] = useState();
    const [foodArr, setFoodArr] = useState([]);
    const [people, setPeople] = useState();
    const user = JSON.parse(Cookies.get('user'));

    useEffect(() => {
        fetch("http://localhost:4000/food")
            .then((response) => response.json())
            .then(data => {
                setFood(data);
            })
    }, []);

    function sendOrder(e) {
        e.preventDefault();
        const order = {
            amount: people,
            food: foodArr
        }
        fetch(`http://localhost:4000/order/${user.userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
            })
    }

    function changeArr(name, type) {
        const obj = {
            name: name,
            type: type
        }
        let arr = [...foodArr];
        for (let food of arr) {
            if (food.name === obj.name && food.type === obj.type) {
                var index = arr.findIndex(objInArr => {
                    return objInArr.name === obj.name && objInArr.type === obj.type;
                });
                if (index !== -1) {
                    arr.splice(index, 1);
                    setFoodArr(arr);
                    return;
                }
            }
        }
        arr.push(obj);
        setFoodArr(arr);
    }

    return (
        <div>
            <form onSubmit={(e) => sendOrder(e)}>
                <div>
                    <label>How many people in the seating</label>
                    <input onChange={(e) => setPeople(e.target.value)} type="number" min={5} max={20} required></input>
                </div>
                {food &&
                    <div>
                        <h3>choose types of meat</h3>
                        {food.map(obj =>
                            obj.type === 'food' &&
                            <>
                                <input onClick={() => changeArr(obj.name, obj.type)} type="checkbox" name={obj.name} />
                                <label>{obj.name}</label>
                            </>
                        )}
                        <h3>Do u want tubi dead today</h3>
                        <input onClick={() => setAlcohol(!alcohol)} type="checkbox" name="alcohol"></input>
                        <label>Alcohol</label>
                        <br />
                        {alcohol &&
                            <>
                                {food.map(obj =>
                                    obj.type === 'drink' &&
                                    <>
                                        <input onClick={() => changeArr(obj.name, obj.type)} type="checkbox" name={obj.name} />
                                        <label>{obj.name}</label>
                                    </>
                                )}
                            </>}
                    </div>}
                <button type="submit">I want to seat!</button>
            </form>
        </div>
    )
}
