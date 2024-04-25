var BasicPage = require('./basicpage');
var qs = require('querystring');

module.exports = class FileUpload extends BasicPage {
    constructor(html) {
        super(html, 'Uploading..');
    }

    handle(request, response) {
        if (request.method === 'POST') {
            console.log('POST')
            var body = '';

            request.on('data', function (data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    request.connection.destroy();
            });

            request.on('end', function () {
                console.log('POST : ' + body)
                var post = qs.parse(body);
                // use post['blah'], etc.
                console.log('POST : ' + post.filename);
            });
        }
        super.handle(request, response);
    }
}