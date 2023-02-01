var express = require('express');
var router = express.Router();
var con = require('../mysql/connection');
const Joi = require('joi');

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
    const schema = Joi.object().keys({
        name: Joi.string().min(4).max(20),
        email: Joi.string().email(),
        phone_number: Joi.string().length(10).pattern(/^[0-9]+$/)
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400);
        res.send(JSON.stringify(result.error.details[0].message));
        return;
    }

    const sql = `UPDATE user SET phone_number = '${req.body.phone_number}', email = '${req.body.email}', full_name = '${req.body.name}' WHERE user_id = '${req.params.id}';`
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(false));
    })
})

module.exports = router;