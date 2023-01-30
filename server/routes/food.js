var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/', function (req, res, next) {
    var sql = 'SELECT name, type FROM food';
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        let names = [];
        for (let name of result) {
            names.push({name: name.name, type: name.type});
        }
        res.send(JSON.stringify(names));
    });
});

module.exports = router;

