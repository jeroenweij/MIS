import BasicPage from './basicpage.js';
import Database from './database.js';

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default class FileUpload extends BasicPage {
    constructor(html) {
        super(html, 'Uploading..');
    }

    async handle(request, response, finished) {
        if (request.method === 'POST') {
            var projectdata = [];

            let body = await this.getPageData(request);

            let data = body.split("\n").map(function (item) {
                return item.trim();
            });

            let typechecked = false;
            let names = null;
            let numbers = null;
            let emails = null;
            let project = "0";
            let activity = "0";

            const columnoffset = 4;
            for (const line of data) {
                if (!typechecked) {
                    if (line === 'Content-Type: text/csv')
                        typechecked = true;
                    continue;
                }
                if (line.length === 0)
                    continue;

                let vars = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(function (item) {
                    return item.trim();
                });
                if (vars.length < 5) {
                    //console.log("<5 <5 <5");
                    continue;
                }
                if (vars[columnoffset] === "E-mailadres")
                    continue;
                if (emails === null) {
                    emails = vars.slice(columnoffset);
                    //console.log("EMAILS::" + emails);
                    continue;
                }
                if (names === null) {
                    names = vars.slice(columnoffset);
                    //console.log("NAMES::" + names);
                    continue;
                }
                if (numbers === null) {
                    numbers = vars.slice(columnoffset);
                    //console.log("NUMBERS::" + numbers);
                    continue;
                }

                if (vars[0].length > 0)
                    project = vars[0]
                if (vars[2].length > 0)
                    activity = vars[2]

                projectdata.push({ project: project, activity: activity, hours: vars.slice(columnoffset) });
            }
            console.log(projectdata);

            // update personel info
            let sql = "INSERT INTO Personel (Email, Name, Number) VALUES ";
            let comma = '';
            for (let i = 0; i < emails.length; i++) {
                if (validateEmail(emails[i])) {
                    if (isNaN(numbers[i])) {
                        numbers[i] = 0;
                    }
                    sql += `${comma} ('${emails[i]}', '${names[i]}', ${numbers[i]})`;
                    comma = ',';
                }
            }
            sql += " AS newData ON DUPLICATE KEY UPDATE Number=newData.Number, Name=newData.Name;";
            //console.log(sql);

            // Update hours
            Database.Query(sql, function (data) {
                sql = "INSERT INTO Hours (Project, Activity, Person, Hours) VALUES ";
                comma = '';

                for (const project of projectdata) {
                    if (project.project === "Eindtotaal") {
                        project.project = 32750; // Magic number :(
                    }

                    for (let i = 0; i < numbers.length; i++) {
                        if (isNaN(numbers[i]) || numbers[i] === 0) {
                            console.error(`User: ${emails[i]}' does not have a number.`);
                            // TODO: need to do something here to make this clear to the user
                            continue;
                        }

                        if (isNaN(project.project) || isNaN(project.activity)) {
                            console.error(`NAN: ${project.project}', '${project.activity}', ${numbers[i]}, ${project.hours[i]}`);
                            // TODO: need to do something here to make this clear to the user
                            continue;
                        }

                        let hours = project.hours[i];
                        if (typeof hours === 'string' || hours instanceof String) {
                            hours = hours.replace(/"/g, "");
                            hours = Number(hours.replace(',', '.'));
                            if (isNaN(hours)) {
                                console.error(`HOURS IS NAN: ${project.hours[i]}`);
                                continue;
                            }
                        }
                        hours *= 100; // to keep 2 decimal places of precission
                        sql += `${comma} ('${project.project}', '${project.activity}', ${numbers[i]}, ${hours})`;
                        comma = ',';
                    }
                }

                sql += " AS newData ON DUPLICATE KEY UPDATE Hours=newData.Hours;";
                //console.log(sql);
                Database.Query(sql, function (data) { });
            });
        }

        response.write('<section id="pricing"><div class="container">');
        response.write('</ br></ br></div></div>');
        finished();
    }

    getPageData(request) {
        return new Promise((resolve, reject) => {
            var body = '';

            request.on('data', function (data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    request.connection.destroy();
            });

            request.on('end', function () {
                resolve(body);
            });
        });
    }
}