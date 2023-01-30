var mysql = require('mysql');
var fs = require('fs');
const password = "z10mz10m";



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "seatingDB"
});

// function createDB() {
//     con.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected!");
//         con.query("CREATE DATABASE seatingDB", function (err, result) {
//             if (err) throw err;
//             console.log("Database created");
//         });
//     });
// }
function convertToSQL(obj) {
    var tableName = obj.tableName;
    var columns = Object.entries(obj.columns).map(entry => entry.join(" ")).join(", ");
    var foreignKeys = "";
    if (obj.foreignKeys) {
        foreignKeys = Object.entries(obj.foreignKeys).map(entry => entry.join(" ")).join(", ");
    }
    console.log(`CREATE TABLE ${tableName} (${columns}${foreignKeys ? ', ' + foreignKeys : ''})`);
    return `CREATE TABLE ${tableName} (${columns}${foreignKeys ? ', ' + foreignKeys : ''})`;
}

function sql() {
    con.connect(function (err) {
        if (err) throw err;

        fs.readdir("/home/hilma/finalProject/final-project/server/mysql/entities", (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                let buffer = fs.readFileSync(`/home/hilma/finalProject/final-project/server/mysql/entities/${file}`);
                if (err) throw err;
                let data = JSON.parse(buffer.toString());
                var sql = convertToSQL(data);
                con.query(sql, data.columns, function (err, result) {
                    if (err) throw err;
                    console.log("Table created");
                })
            })
        })
        console.log("Connected!");

    });
}
module.exports = sql;