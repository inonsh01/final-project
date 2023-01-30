var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/', function (req, res, next) {
    res.send("hay");
});

router.post('/:id', function (req, res, next) {
    const id = req.params.id;
    const obj = req.body;
    calc(obj);
    res.send(JSON.stringify("hay"));
});
module.exports = router;

function calc(obj) {
    try {
        const gramPerPerson = 300;
        const personPerBottle = 4;
        let gramPerSeat = gramPerPerson * obj.amount;
        let bottlePerSeat = Math.ceil(obj.amount / personPerBottle);
        let [foodArr, drinksArr, foodNames, drinksNames] = convertToArray(obj.food);
        if (drinksArr.length !== 0) {
            if (bottlePerSeat < drinksArr.length) {
                bottlePerSeat = drinksArr.length;
            }
            addAmount(drinksArr, 1, bottlePerSeat);
            drinksArr = addPrice(drinksArr, drinksNames);
        }
        addAmount(foodArr, 100, gramPerSeat);
        foodArr = addPrice(foodArr, foodNames);

        console.log('drinksArr: ', drinksArr);
        console.log('foodArr: ', foodArr);
    }
    catch (e) {
        console.log(e);
    }

}

function addPrice(arr, names) {
    let pricesArr = [];
    var sql = 'SELECT price, name FROM food WHERE name in ?'
    con.query(sql, [[names]], function (err, result) {
        for (let i = 0; i < result.length; i++) {
            pricesArr.push({ name: result[i].name, price: result[i].price });
        }
        for (let i in arr) {
            var index = pricesArr.findIndex(objInArr => {
                return objInArr.name === arr[i].name;
            });
            arr[i].price = (arr[i].amount / 100 * pricesArr[index].price);
        }
    });
}

function addAmount(arr, num, totalAmount) {
    let iInArr = 0;
    for (i = totalAmount; i > 0; i -= num) {
        if (!arr[iInArr]) {
            iInArr = 0;
        }
        arr[iInArr].amount += num;
        iInArr++;
    }
}

function convertToArray(arr) {
    let arrOfFood = [];
    let arrOfDrinks = [];
    let arrOfObjsFood = [];
    let arrOfObjDrinks = [];

    for (let obj of arr) {
        if (obj.type === 'food') {
            arrOfFood.push(obj.name)
            arrOfObjsFood.push({ name: obj.name, amount: 0, price: 0 });
        }
        else if (obj.type === 'drink') {
            arrOfDrinks.push(obj.name)
            arrOfObjDrinks.push({ name: obj.name, amount: 0, price: 0 });
        }
    }
    return [arrOfObjsFood, arrOfObjDrinks, arrOfFood, arrOfDrinks];
}
