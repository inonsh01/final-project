import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie';
import OrderTable from './OrderTable';
export default function Order() {
    const [food, setFood] = useState();
    const [alcohol, setAlcohol] = useState();
    const [foodArr, setFoodArr] = useState([]);
    const [people, setPeople] = useState();
    const [fullOrder, setFullOrder] = useState([]);
    const user = JSON.parse(Cookies.get('user'));
    const [totalPrice, setTotalPrice] = useState();
    const orderTableRef = useRef(null);

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
        fetch(`http://localhost:4000/food/prices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then((response) => response.json())
            .then(data => {
                try {
                    calc(order, data);
                }
                catch (err) {
                    return;
                }
            });
    }

    function calc(obj, pricesArr) {
        const gramPerPerson = 400;
        const personPerBottle = 4;
        let gramPerSeat = gramPerPerson * obj.amount;
        let bottlePerSeat = Math.ceil(obj.amount / personPerBottle);
        let [foodArr, drinksArr] = convertToArray(obj.food);
        if (drinksArr.length !== 0) {
            if (bottlePerSeat < drinksArr.length) {
                bottlePerSeat = drinksArr.length;
            }
            addAmount(drinksArr, 1, bottlePerSeat);
            drinksArr = addPrice(drinksArr, pricesArr);
        }
        addAmount(foodArr, 100, gramPerSeat);
        foodArr = addPrice(foodArr, pricesArr);

        //convert to price of bottle
        for (let organ of drinksArr) {
            organ.price = organ.price * 100;
        }
        const fullArr = foodArr.concat(drinksArr);
        let price = 0;
        for (let obj of fullArr) {
            price += obj.price;
        }
        setTotalPrice(price);
        setFullOrder(fullArr);
        orderTableRef.current(fullArr, price);
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
        <div className='order'>
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
                        <h3>Do u want tubi dead today?</h3>
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
                                        <img alt = "img-element" src = {`http://localhost:4000/order/img?imgUrl=${obj.img}`} />
                                    </>
                                )}
                            </>}
                    </div>}
                <button type="submit">I want to seat!</button>
            </form>
            {fullOrder.length > 0 && <OrderTable people = {people} orderTableRef={orderTableRef} fullOrder={fullOrder} totalPrice={totalPrice} />}
        </div>
    )
}



function addAmount(arr, num, totalAmount) {
    let iInArr = 0;
    for (let i = totalAmount; i > 0; i -= num) {
        if (!arr[iInArr]) {
            iInArr = 0;
        }
        arr[iInArr].amount += num;
        iInArr++;
    }
}

function addPrice(arr, pricesArr) {
    for (let i in arr) {
        var index = pricesArr.findIndex(objInArr => {
            return objInArr.name === arr[i].name;
        });
        arr[i].price = (arr[i].amount / 100 * pricesArr[index].price);
    }
    return arr;
}

function convertToArray(arr) {
    let arrOfObjsFood = [];
    let arrOfObjDrinks = [];

    for (let obj of arr) {
        if (obj.type === 'food') {
            arrOfObjsFood.push({ name: obj.name, amount: 0, price: 0 });
        }
        else if (obj.type === 'drink') {
            arrOfObjDrinks.push({ name: obj.name, amount: 0, price: 0 });
        }
    }
    return [arrOfObjsFood, arrOfObjDrinks];
}