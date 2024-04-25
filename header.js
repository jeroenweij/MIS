var fs = require('fs');

var htmlFile;

fs.readFile('./templates/header.html', "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    htmlFile = data;
});

function write(response, title) {
    var obj = { title: title, b: 'two' };
    response.write(htmlFile.replace(/\${([^}]*)}/g, (r, k) => obj[k]));
}

exports.write = write;