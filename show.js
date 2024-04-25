var url = require('url')

var index = require('./index');
var header = require('./header');
var footer = require('./footer');

var contentMap = {
    '/': index
};

function showPage(request, response) {
    var pathName = url.parse(request.url).pathname;

    if (contentMap[pathName]) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        header.write(response, contentMap[pathName].title());
        response.write(contentMap[pathName].body());
        footer.write(response);
        response.end();

        return true;
    }
    return false;
}

exports.showPage = showPage;