var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().min(2).max(20).required(),
    price: Joi.number().min(1).max(9999).required(),
    type: Joi.string().pattern(/\b(food|drink)\b/).required(),
    img: Joi.string().pattern(/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/).required()
});


router.get('/', function (req, res) {
    var sql = `SELECT type FROM user WHERE user_id = ${req.query.id}`
    con.query(sql, function (err, result) {
        if (result) {
            if (result[0].type === 'admin') {
                sendAllItems(res);
                return;
            }
        }
        res.status(403)
        res.send(false);
    });
});


router.put('/food', function (req, res) {
    let reqData = req.body.data;
    const result = schema.validate(reqData);
    if (result.error) {
        console.log(result.error);
        sendError(res, result.error);
        return;
    }
    var sql = `UPDATE food SET ? WHERE food_id =${req.body.foodId}`;

    con.query(sql, reqData, function (err, result) {
        if (err) throw (err);
        res.send(JSON.stringify(req.body));
    })
});


router.post('/food', function (req, res) {
    let reqData = req.body;
    const result = schema.validate(reqData);
    if (result.error) {
        console.log(result.error);
        sendError(res, result.error);
        return;
    }
    let details = Object.values(reqData);
    var sql = `INSERT INTO food (name, price, type, img) VALUES ?`;

    con.query(sql, [[details]], function (err, result) {
        if (err) throw (err);
        res.send(JSON.stringify(true));
    })
});

router.delete('/food', function (req, res) {
    var sql = `DELETE FROM food WHERE food_id =${req.query.id}`;
    con.query(sql, function (err, result) {
        if (err) throw (err);
        res.send();
    })
})

module.exports = router;

function sendAllItems(res) {
    var sql = `SELECT * FROM food`
    con.query(sql, function (err, result) {
        res.send(JSON.stringify(result));
    });
}

function sendError(res, err) {
    let errStr;
    switch (err.details[0].path[0]) {
        case "type":
            errStr = "Type must be Food/Drink";
            break;
        case "price":
            errStr = "Price must be a number between 1 and 9999";
            break;
        case "name":
            errStr = "Length name must be between 2 - 20";
            break;
        case "img":
            errStr = "Wrong link";
            break;
        default:
            break;
    }
    res.status(400);
    res.send(errStr);
}