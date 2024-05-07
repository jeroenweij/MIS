import GetConnection from './dbconnection.js';

export default function Query(sql, callback) {
    var con = GetConnection();
    var result;

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);
            callback(result);
        });

    });
}
