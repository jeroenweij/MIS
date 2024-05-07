import BasicPage from './basicpage.js';

import GetConnection from './dbconnection.js';

export default class Planning extends BasicPage {
    constructor(html) {
        super(html, 'Planning');
    }

    handle(request, response) {
        GetConnection();
        super.handle(request, response);
    }
}