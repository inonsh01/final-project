var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

function ifExist(req, res) {
    let user = req.body;
    var sql = `SELECT password.password, user.user_id AS user_user_id, password.user_id AS password_user_id FROM user JOIN password ON password.password = '${user.password}' AND user.user_name = '${user.name}'`
    con.query(sql, function (err, result) {
        if (!result[0]) {
            res.send(false);
            return;
        }
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result[0].user_id));
    });
}

router.post('/', function (req, res, next) {
    ifExist(req, res);
});
module.exports = router;