var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

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
    var sql = `UPDATE food SET ? WHERE food_id =${req.body.foodId}`;

    con.query(sql, reqData, function (err, result) {
        if (err) throw (err);
        res.send(JSON.stringify(req.body));
    })
});


router.post('/food', function (req, res) {
    let reqData = req.body;
    let details = Object.values(reqData);
    var sql = `INSERT INTO food (name, price, type, img) VALUES ?`;

    con.query(sql, [[details]], function (err, result) {
        if (err) throw (err);
        res.send();
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