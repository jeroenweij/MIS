var url = require('url')

var header = require('./header');
var footer = require('./footer');
var BasicPage = require('./basicpage');
var FileUpload = require('./fileupload');

var index = new BasicPage('index', 'Welcome');
var board = new BasicPage('board', 'Welcome');
var upload = new BasicPage('upload', 'upload');
var fileupload = new FileUpload('index');

var contentMap = {
    '/': index,
    '/board': board,
    '/upload': upload,
    '/fileupload': fileupload
};

function showPage(request, response) {
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

exports.showPage = showPage;