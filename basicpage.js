var fs = require('fs');

module.exports = class BasicPage {
    title = "";
    htmlFile = "";

    constructor(html, title) {
        this.title = title;
        var that = this;
        fs.readFile(`./templates/${html}.html`, "utf8", function (err, data) {
            if (err) {
                throw err;
            }

            var obj = { title: title, text: 'Verry interesting text to reed' };
            that.htmlFile = data.replace(/\${([^}]*)}/g, (r, k) => obj[k]);
        });
    }

    // set variable(value) {
    //     this.variable = value;
    // }

    handle(request, response) {
        response.write(this.htmlFile);
    }

    greetStudent() {
        console.log(
            "Hello, " + this.studentName +
            "! Your university ID is " + this.studentID);
    }
}

