import fs from 'node:fs';

export default class Header {
    htmlFile = "";

    constructor() {
        var that = this;
        fs.readFile('./html/header.html', "utf8", function (err, data) {
            if (err) {
                throw err;
            }
            that.htmlFile = data;
        });
    }

    write(response, title) {
        var obj = { title: title, b: 'two' };
        response.write(this.htmlFile.replace(/\${([^}]*)}/g, (r, k) => obj[k]));
    }

}