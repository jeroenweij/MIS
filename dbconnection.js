import mysql from 'mysql2'

export default function  GetConnection() {
    var con = mysql.createConnection({
        host: "host",
        user: "user",
        port: "port",
        password: "password",
        database: "database"
    });

    return con;
}
