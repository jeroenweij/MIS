const formidable = require("formidable")
//var formidable = require('formidable');
var BasicPage = require('./basicpage');
var qs = require('querystring');

module.exports = class FileUpload extends BasicPage {
    constructor(html) {
        super(html, 'Uploading..');
    }

    async handle(request, response) {
        if (request.method === 'POST') {
            const form = formidable({});
            let fields;
            let files;
            try {
                [fields, files] = await form.parse(req);
            } catch (err) {
                response.write('ERROR');
                return;
            }
            response.write(JSON.stringify({ fields, files }, null, 2));
            return;
        }
        super.handle(request, response);
    }
}