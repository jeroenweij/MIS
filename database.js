import GetConnection from './dbconnection.js';

export default function  Query(sql) {
    var con = GetConnection();

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
          
    });
}
