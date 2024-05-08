import mysql from 'mysql2'

var con = null;

export default function GetConnection() {
    if (con == null) {
        con = mysql.createConnection({
            host: "host",
            user: "user",
            port: "port",
            password: "password",
            database: "database",
            dateStrings: 'date'
        });
    }
    return con;
}
