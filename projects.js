import BasicPage from './basicpage.js';

import Database from './database.js';

export default class Projects extends BasicPage {
    constructor(html) {
        super(html, 'Projects');
    }

    handle(request, response, finished) {

        response.write('<section id="pricing"><div class="container">');
        response.write(`<div class="row">`);
        response.write(`<div class="col">TaskCode</div>`);
        response.write(`<div class="col">Project name</div>`);
        response.write(`<div class="col">Activity Name</div>`);
        response.write(`<div class="col">WBSO label</div>`);
        response.write(`<div class="col">Status</div>`);
        response.write(`<div class="col">Start date</div>`);
        response.write(`<div class="col">End date</div>`);
        response.write(`</div>`);

        Database.Query("SELECT Activities.Project, Activities.Key, Projects.Name as ProjectName, Activities.Name, Activities.WBSO, Activities.StartDate, Activities.EndDate, Status.Status FROM Activities LEFT JOIN Projects ON Activities.Project = Projects.Id LEFT JOIN Status ON Projects.Status=Status.Id Where Projects.Status=3;", function (data) {

            const zeroPad = (num, places) => String(num).padStart(places, '0')

            for (let value of data) {
                if (!value.WBSO) value.WBSO = "";

                console.log(value);
                response.write(`<div class="row">`);
                response.write(`<div class="col">${value.Project}-${zeroPad(value.Key, 3)}</div>`);
                response.write(`<div class="col">${value.ProjectName}</div>`);
                response.write(`<div class="col">${value.Name}</div>`);
                response.write(`<div class="col">${value.WBSO}</div>`);
                response.write(`<div class="col">${value.Status}</div>`);
                response.write(`<div class="col">${value.StartDate}</div>`);
                response.write(`<div class="col">${value.EndDate}</div>`);
                response.write(`</div>`);
            }
            response.write('</div></div>');

            finished();
        });

    }
}