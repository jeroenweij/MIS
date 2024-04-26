import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';

import showPage from './show.js';

http.createServer(onRequest).listen(8888);
console.log('Server has started');

function onRequest(request, response) {
    var pathName = url.parse(request.url).pathname
    console.log('pathname ' + pathName);

    if (!showPage(request, response)) {
        var path = './www' + request.url;
        fs.readFile(path, function (err, data) {
            if (!err) {
                var dotoffset = request.url.lastIndexOf('.');
                var mimetype = dotoffset == -1
                    ? 'text/plain'
                    : {
                        '.html': 'text/html',
                        '.ico': 'image/x-icon',
                        '.jpg': 'image/jpeg',
                        '.png': 'image/png',
                        '.gif': 'image/gif',
                        '.css': 'text/css',
                        '.js': 'text/javascript'
                    }[request.url.substr(dotoffset)];
                response.setHeader('Content-type', mimetype);
                response.end(data);
                //console.log(path, mimetype);
            } else {
                console.log('file not found: ' + path);
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end();
            }
        });
    }

}