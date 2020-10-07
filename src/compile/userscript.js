const path = require('path');
const fs = require('fs');
const os = require('os');

/*
 * Config file with every necessary aspect for an userscript & more
 */
const config = require('./config.json');

/*
 * Length of the longest entry in config.header for cool looking userscript header
 */
const longest_entry = 11;

/*
 * I require the package.json just to have some dynamic variables
 */
const env = require('../../package.json');

Object.assign(config.header, {
    name: env.name,
    description: env.description,
    version: env.version,
    author: env.author,
});

if (!config.path || config.path === '' || config.path.length <= 0)
    throw 'path was not defined in config';

if (config.files.length <= 0) throw 'no files were provided';

/*
 * Read javascript files that will compiled to one userscript
 */

let script = '';
for (let value of config.files)
    script += fs.readFileSync(path.join(__dirname, value)).toString() + os.EOL;

let globals = '';
for (let value of config.globals)
    globals += fs.readFileSync(path.join(__dirname, value)).toString() + os.EOL;

let styles = '';
for (let value of config.styles)
    styles += fs.readFileSync(path.join(__dirname, value)).toString() + os.EOL;

/*
 * Create WriteStream to write to file
 */
const userscript = fs.createWriteStream(
    path.join(__dirname, config.path, `${config.header.name}.user.js`),
    { flags: 'w' }
);

/*
 * Beginning of header
 */
userscript.write('// ==UserScript==' + os.EOL);

/*
 * Build userscript header
 */
for (key in config.header) {
    if (
        !config.header[key] ||
        config.header[key] === '' ||
        config.header[key].length === 0
    )
        continue;

    let spaces = '';
    for (let i = 0; i < Math.abs(key.length - longest_entry); i++)
        spaces += ' ';

    switch (typeof config.header[key]) {
        case 'object':
            config.header[key].forEach((x) => {
                userscript.write(`// @${key}${spaces} ${x}` + os.EOL);
            });
            break;

        default:
            userscript.write(
                `// @${key}${spaces} ${config.header[key]}` + os.EOL
            );
            break;
    }
}

/*
 * End of header
 */
userscript.write('// ==/UserScript==' + os.EOL);

/*
 * Append actual userscript
 */
userscript.write(`
${globals}

(function() {
    'use strict';

GM_addStyle(\`
    ${styles}
\`);

${script}

})();
`);
