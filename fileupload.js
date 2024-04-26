import BasicPage from './basicpage.js';

export default class FileUpload extends BasicPage {
    constructor(html) {
        super(html, 'Uploading..');
    }

    async handle(request, response) {
        if (request.method === 'POST') {
            let body = await this.getPageData(request);

            let data = body.split("\n").map(function (item) {
                return item.trim();
            });

            let typechecked = false;
            let names = null;
            let numbers = null;
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

                let vars = line.split(",").map(function (item) {
                    return item.trim();
                });
                if (vars.length < 5)
                    continue;
                if (vars[columnoffset] === "Medewerker")
                    continue;
                if (names === null) {
                    names = vars.slice(columnoffset);
                    console.log(names);
                    continue;
                }
                if (numbers === null) {
                    numbers = vars.slice(columnoffset);
                    console.log(numbers);
                    continue;
                }
                
                if (vars[0].length > 0)
                    project = vars[0]
                if (vars[2].length > 0)
                    activity = vars[2]

                console.log(`project ${project} act ${activity} ` + line);
            }

        }
        super.handle(request, response);
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