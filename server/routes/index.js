var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  mysql();
  res.render('index', { title: 'Express' });
});

module.exports = router;
