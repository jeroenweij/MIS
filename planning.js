import BasicPage from './basicpage.js';

import Query from './database.js';

export default class Planning extends BasicPage {
    constructor(html) {
        super(html, 'Planning');
    }

    handle(request, response, finished) {
        Query("SELECT Name from Personel;", function (personel) {

            for (let value of personel) {
                console.log(value);
            }

            response.write('<section id="pricing"><div class="container">');
            response.write(`<table>\n`);

            Query("SELECT Activities.Project, Activities.Key, Activities.Name, Activities.BudgetHours, Projects.Name as ProjectName, Personel.Name as Manager FROM Activities LEFT JOIN Projects ON Activities.Project = Projects.Id LEFT JOIN Personel ON Projects.Manager=Personel.Id Where Projects.Status=3;", function (data) {
                let projectid = -1;
                const zeroPad = (num, places) => String(num).padStart(places, '0')

                for (let value of data) {
                    if (projectid != value.Project) {
                        response.write(`<tr class="spacer"><td>&nbsp;</td></tr>\n<tr>`);
                        response.write(`<td colspan="100%"><b>${value.Project}  ${value.ProjectName}</b> (${value.Manager})</td>`);
                        response.write(`</rt>`);
                        response.write(`<tr>`);
                        response.write(`<th>TaskCode</th>`);
                        response.write(`<th>Activity Name</th>`);
                        response.write(`<th>Available</th>`);
                        response.write(`<th>Planned</th>`);
                        response.write(`<th>Realised</th>`);

                        for (let person of personel) {
                            response.write(`<th colspan="2">${person.Name}</th>`);
                        }

                        response.write(`</tr>\n`);

                        projectid = value.Project
                    }

                    //console.log(value);
                    response.write(`<tr>`);
                    response.write(`<td>${value.Project}-${zeroPad(value.Key, 3)}</td>`);
                    response.write(`<td>${value.Name}</td>`);
                    response.write(`<td>${value.BudgetHours}</td>`);
                    response.write(`<td>${value.BudgetHours}</td>`);
                    response.write(`<td>${value.BudgetHours}</td>`);
                    for (let person of personel) {
                        response.write(`<td>0</td>`);
                        response.write(`<td>4</td>`);
                    }
                    response.write(`</tr>\n`);
                }
                response.write('</table></ br></ br></div></div>');

                finished();
            });
        });
    }
}