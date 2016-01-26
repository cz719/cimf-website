'use strict';

global.Promise = require('bluebird');

const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const childProcess = Promise.promisifyAll(require('child_process'));
const co = require('co');
const ejs = require('ejs');
const glob = Promise.promisify(require('glob'));

co(function *() {
  const files = yield glob(path.join(__dirname, '../source/html/**/!(_)*.ejs'));

  files.forEach(co.wrap(function *(file) {
    const str = yield fs.readFileAsync(file, 'utf8');

    const rel = path.relative(path.join(__dirname, '../source/html'), file);
    const obj = path.parse(path.join(__dirname, '../public', rel));
    const dest = path.join(obj.dir, `${obj.name}.html`);

    yield childProcess.execAsync(`mkdir -p ${obj.dir}`);

    yield fs.writeFileAsync(dest, ejs.render(str, {filename: file}), 'utf8');
  }));
});
