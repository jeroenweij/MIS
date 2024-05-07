import url from 'node:url';

import Header from './header.js';
import Footer from './footer.js';
import BasicPage from './basicpage.js';
import FileUpload from './fileupload.js';
import Planning from './planning.js';
import Projects from './projects.js';

var index = new Planning('index');
var projects = new Projects('index');
var board = new BasicPage('board', 'Welcome');
var upload = new BasicPage('upload', 'upload');
var fileupload = new FileUpload('index');
var header = new Header();
var footer = new Footer();

var contentMap = {
    '/': index,
    '/board': board,
    '/upload': upload,
    '/fileupload': fileupload,
    '/projects': projects
};

export default function showPage(request, response) {
    var pathName = url.parse(request.url).pathname;

    if (contentMap[pathName]) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        header.write(response, contentMap[pathName].title);

        contentMap[pathName].handle(request, response, function () {
            footer.write(response);
            response.end();
        });


        return true;
    }
    return false;
}
