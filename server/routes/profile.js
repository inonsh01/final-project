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


module.exports = router;