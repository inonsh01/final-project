var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');

router.get('/:id', function (req, res) {
    console.log(req.params.id);
    const sql = `SELECT * FROM user WHERE user_id = '${req.params.id}';`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
})

router.put('/:id', function (req, res) {
    console.log(req.body);
    const sql = `UPDATE user SET full_name = '${req.body.name}' WHERE user_id = '${req.params.id}';`
    con.query(sql, function (err, result) {
        console.log(result);
        if (err) throw err;
        res.send(JSON.stringify(req.body.name));
    })
})

module.exports = router;