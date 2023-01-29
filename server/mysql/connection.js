var mysql = require('mysql');
const password = "inonsh01";

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