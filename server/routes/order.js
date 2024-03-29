var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/img', function (req, res, next) {
    const path = `/home/hilma/Desktop/Hilma's-Projects/projects/finalProject/server/pics/${req.query.imgUrl}`
    res.sendFile(path)
});

router.get('/', function (req, res, next) {
    if (req.query.orderId) {
        sendOrderInfo(req, res);
        return;
    }
    var sql = `SELECT price, order_id, people FROM user_order WHERE user_id = ${req.query.id}`;
    con.query(sql, function (err, result) {
        res.send(JSON.stringify(result));
    });
});

router.post('/', function (req, res, next) {
    let details = req.body;
    var sql = `
    INSERT INTO user_order (user_id, price, people)
      VALUES (${details.userId}, ${details.totalPrice}, ${details.totalPeople});`
    con.query(sql, function (err, result) {
        if (err) throw err;
        var sql = `INSERT INTO order_info (order_id, food_name, amount, price) VALUES ?`
        const values = details.fullOrder.map((obj) => [
            `${result.insertId * 1}`,
            ...Object.values(obj)
        ]);
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify(result));
        });
    })
});

router.delete('/', function (req, res) {
    var sql = `DELETE FROM user_order WHERE order_id =${req.query.id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send();
    });
});
module.exports = router;

function sendOrderInfo(req, res) {
    const orderId = req.query.orderId;
    var sql = `SELECT * FROM order_info WHERE order_id = ${orderId}`;
    con.query(sql, function (err, result) {
        res.send(JSON.stringify(result));
    });
}