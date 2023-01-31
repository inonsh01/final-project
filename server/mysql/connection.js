var mysql = require('mysql');
const password = "z10mz10m";

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "seatingDB"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;