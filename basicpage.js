import fs from 'node:fs';

export default class BasicPage {
    title = "";
    htmlFile = "";

    constructor(html, title) {
        this.title = title;
        var that = this;
        fs.readFile(`./html/${html}.html`, "utf8", function (err, data) {
            if (err) {
                throw err;
            }

            var obj = { title: title, text: 'Verry interesting text to reed' };
            that.htmlFile = data.replace(/\${([^}]*)}/g, (r, k) => obj[k]);
        });
    }

    handle(request, response, finished) {
        response.write(this.htmlFile);
        finished();
    }

    greetStudent() {
        console.log(
            "Hello, " + this.studentName +
            "! Your university ID is " + this.studentID);
    }
}

