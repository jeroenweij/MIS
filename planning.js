import BasicPage from './basicpage.js';

import Database from './database.js';

export default class Planning extends BasicPage {
    constructor(html) {
        super(html, 'Planning');
    }

    handle(request, response, finished) {
        Database.Query("SELECT Name, Number from Personel ORDER BY Ord, Id;", function (personel) {

            response.write('<section><div class="container"><div class="horizontalscrol">');
            response.write(`<table>\n`);

            Database.Query("SELECT Activities.Project, Activities.Key, Activities.Name, Activities.BudgetHours, Projects.Name as ProjectName, Personel.Name as Manager FROM Activities LEFT JOIN Projects ON Activities.Project = Projects.Id LEFT JOIN Personel ON Projects.Manager=Personel.Id Where Projects.Status=3 AND Activities.Show=1 ORDER BY Projects.Id, Activities.Key;", async function (data) {
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
                            let firstname = person.Name.split(" ")[0];
                            response.write(`<th colspan="2">${firstname}</th>`);
                        }

                        response.write(`</tr>\n`);

                        projectid = value.Project
                    }

                    //console.log(value);
                    response.write(`<tr>`);
                    response.write(`<td>${value.Project}-${zeroPad(value.Key, 3)}</td>`);
                    response.write(`<td>${value.Name}</td>`);
                    response.write(`<td>${value.BudgetHours}</td>`);


                    let data = await Database.QuerySync(`SELECT Hours, Plan, Person FROM Hours WHERE Project=${value.Project} AND Activity=${value.Key}`);

                    // Get total planned hours
                    let planned = 0;
                    for (let i of data) {
                        if (i.Person != 32750)
                        planned += i.Plan / 100;
                    }
                    response.write(`<td>${planned}</td>`);


                    // Get realisation from yoobi data
                    let hourdata = data.find(o => o.Person === 32750);
                    let realised = 0;
                    if (hourdata) {
                        realised = hourdata.Hours / 100;
                    }
                    response.write(`<td>${realised}</td>`);

                    for (let person of personel) {
                        hourdata = data.find(o => o.Person === person.Number);
                        let hours = 0;
                        let plan = 0;
                        if (hourdata) {
                            hours = hourdata.Hours / 100;
                            plan = hourdata.Plan / 100;
                        }
                        if (hours === 0 || isNaN(hours)) {
                            hours = '&nbsp;';
                        }
                        if (plan === 0 || isNaN(plan)) {
                            plan = '';
                        }

                        response.write(`<td><input type="text" id="fname" name="fname" value="${plan}" maxlength="4" size="3"></td>`);
                        //response.write(`<td>${plan}</td>`);
                        response.write(`<td>${hours}</td>`);
                    }
                    response.write(`</tr>\n`);
                }
                response.write('</table></ br></ br></div></div></section>');

                finished();
            });
        });
    }
}