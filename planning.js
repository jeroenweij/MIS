import BasicPage from './basicpage.js';

import Database from './database.js';

export default class Planning extends BasicPage {
    constructor(html) {
        super(html, 'Planning');
    }

    handle(request, response, finished) {
        Database.Query("SELECT Name, Number from Personel ORDER BY Ord, Id;", function (personel) {

            response.write('<section id="pricing"><div class="container">');
            response.write(`<table>\n`);

            Database.Query("SELECT Activities.Project, Activities.Key, Activities.Name, Activities.BudgetHours, Projects.Name as ProjectName, Personel.Name as Manager FROM Activities LEFT JOIN Projects ON Activities.Project = Projects.Id LEFT JOIN Personel ON Projects.Manager=Personel.Id Where Projects.Status=3;", async function (data) {
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
                        let data = await Database.QuerySync(`SELECT Hours, Plan FROM Hours WHERE Person=${person.Number} AND Project=${value.Project} AND Activity=${value.Key} LIMIT 1`);
                        let hours = 0;
                        let plan = 0;
                        if (data.length > 0) {
                            console.log(data[0]);
                            hours = data[0].Hours / 100;
                            plan = data[0].Plan / 100;
                            console.log(hours);
                        }
                        if (hours === 0|| isNaN(hours)) {
                            hours = '';
                        }
                        if (plan === 0 || isNaN(plan)) {
                            plan = '';
                        }
                        console.log(data);
                        //response.write(`<td><input type="text" id="fname" name="fname" value="${plan}"></td>`);
                        response.write(`<td>${plan}</td>`);
                        response.write(`<td>${hours}</td>`);
                    }
                    response.write(`</tr>\n`);
                }
                response.write('</table></ br></ br></div></div>');

                finished();
            });
        });
    }
}