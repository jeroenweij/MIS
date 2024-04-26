import formidable from '/usr/local/lib/node_modules/formidable/src/index.js';
import BasicPage from './basicpage.js';

export default class FileUpload extends BasicPage {
    constructor(html) {
        super(html, 'Uploading..');
    }

    async handle(request, response) {
        if (request.method === 'POST') {
            console.log("Posting!");
            const form = formidable({});
            let fields;
            let files;
            try {
                form.on('fileBegin', function (name, file){
                    file.filepath = __dirname + '/uploads/' + file.originalFilename;
                });
                
                form.on('file', function (name, file){
                    console.log('Uploaded ' + file.name);
                });

                [fields, files] = await form.parse(request);

            } catch (err) {
                console.error(err);
                response.write('ERROR');
            }
            console.log('data:')
            console.log(JSON.stringify({ fields, files }, null, 2));
        }
        super.handle(request, response);
    }
}