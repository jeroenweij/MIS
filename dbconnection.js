import mysql from 'mysql2'

var con = null;

export default function GetConnection() {
    if (con == null) {
        con = mysql.createConnection({
            host: "Host",
            user: "Username",
            port: "3306",
            password: "Password",
            database: "mis",
            dateStrings: 'date'
        });
    }
    return con;
}
