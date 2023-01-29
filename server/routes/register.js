var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


function ifExist(req, res) {
    let user = req.body;
    var sql = `SELECT * FROM user WHERE user_name = '${user.name}'`
    con.query(sql, function (err, result) {
        if (result[0]) {
            res.send(false);
            return;
        }
    });
}

function register(req, res, admin) {
    let type = admin ? 'admin' : 'user';
    var sql = `INSERT INTO user (user_name, type) VALUES ('${req.body.name}', '${type}')`;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.send(err);
        sql = `INSERT INTO password (user_id, password) VALUES ((SELECT user_id FROM user WHERE user_name = '${req.body.name}'), '${req.body.password}')`
        con.query(sql, function (err, result) {
            if (err) res.send(err);
            else res.send(true);
        });
    });

    console.log(req.body);
}
router.post('/', function (req, res, next) {
    ifExist(req, res);
    register(req, res);
});
module.exports = router;