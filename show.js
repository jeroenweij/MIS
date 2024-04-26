import url from 'node:url';

import Header from './header.js';
import Footer from './footer.js';
import BasicPage from './basicpage.js';
import FileUpload from './fileupload.js';

var index = new BasicPage('index', 'Welcome');
var board = new BasicPage('board', 'Welcome');
var upload = new BasicPage('upload', 'upload');
var fileupload = new FileUpload('index');
var header = new Header();
var footer = new Footer();

var contentMap = {
    '/': index,
    '/board': board,
    '/upload': upload,
    '/fileupload': fileupload
};

export default function showPage(request, response) {
    var pathName = url.parse(request.url).pathname;

    if (contentMap[pathName]) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        header.write(response, contentMap[pathName].title);
        
        contentMap[pathName].handle(request, response);
        
        footer.write(response);
        response.end();

        return true;
    }
    return false;
}
