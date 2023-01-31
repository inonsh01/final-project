var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/', function (req, res, next) {
    var sql = 'SELECT name, type FROM food';
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        let names = [];
        for (let name of result) {
            names.push({ name: name.name, type: name.type });
        }
        res.send(JSON.stringify(names));
    });
});

router.post('/prices', function (req, res) {
    getPricesOfOrderAndSendResponse(req, res);

});

module.exports = router;

function getPricesOfOrderAndSendResponse(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let names = [];
    let pricesArr = [];
    for (let organ of obj.food) {
        names.push(organ.name);
    }
    if (names.length <= 0) {
        res.status(400);
        res.send(JSON.stringify(""));
        return;
    }
    var sql = 'SELECT price, name FROM food WHERE name in ?'
    con.query(sql, [[names]], function (err, result) {
        if (err) { res.send(err); throw err; }

        for (let i = 0; i < result.length; i++) {
            pricesArr.push({ name: result[i].name, price: result[i].price });
        }
        res.send(JSON.stringify(pricesArr));
    });
}
