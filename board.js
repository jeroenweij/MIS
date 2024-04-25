var fs = require('fs');

var htmlFile;
var title = 'MIS';

fs.readFile('./templates/board.html', "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    htmlFile = data;
});

function body(){
    var obj = { title: title, text: 'Verry interesting text to reed' };
    return htmlFile.replace(/\${([^}]*)}/g, (r, k) => obj[k]);
}

exports.title = title;
exports.body = body;