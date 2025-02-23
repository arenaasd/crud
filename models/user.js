const mysql = require("mysql2")


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nadanak420",
    database: "practice"
})

module.exports = con
