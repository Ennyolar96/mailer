"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = Template;
function Template(data) {
    let msg = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New form submit</title>
            <style>
                body {
                font-family: sans-serif;
                margin: 0;
                padding: 20px;
                }
                .container {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 20px;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h2>New data submitted:</h2>
                <p>new data submitted from justgivemeforfree/toy</p>
                <div style="text-balance: wrap;">
                ${data}
                </div>
            </div>
            </body>
            </html>`;
    return msg;
}
//# sourceMappingURL=template.js.map