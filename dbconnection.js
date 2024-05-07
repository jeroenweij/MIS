import mysql from 'mysql2'

export default function  GetConnection() {
    var con = mysql.createConnection({
        host: "host",
        user: "user",
        port: "port",
        password: "password"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    return con;
}
