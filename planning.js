import BasicPage from './basicpage.js';

import Query from './database.js';

export default class Planning extends BasicPage {
    constructor(html) {
        super(html, 'Planning');
    }

    handle(request, response) {
        Query("SELECT table_name FROM user_tables;");
        super.handle(request, response);
    }
}