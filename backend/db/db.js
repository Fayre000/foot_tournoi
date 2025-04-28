const mysql = require("mysql2");
const bcrypt = require("bcrypt");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SQLFAYCAL",
    database: "tournament_system",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Database connected!");
});


module.exports = db;
