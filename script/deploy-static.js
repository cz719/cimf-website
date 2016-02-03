'use strict';

const Bluebird = require('bluebird');

global.Promise = Bluebird;

const path = require('path');
const fs = require('mz/fs');
const config = require('config');
const AWS = require('aws-sdk');
const co = require('co');
const globAsync = Bluebird.promisify(require('glob'));
const mime = require('mime');

const AWS_API_VERSION = '2015-01-12';
const BUCKET = 'static.cimfusa.com';

AWS.config.update({
  accessKeyId: config.get('AWS.accessKeyId'),
  secretAccessKey: config.get('AWS.secretAccessKey'),
});

const s3 = new AWS.S3({
  apiVersion: AWS_API_VERSION,
});

Bluebird.promisifyAll(Object.getPrototypeOf(s3));

co(function *() {
  const files = yield globAsync(path.resolve(__dirname, '../public/**/*.*'));

  for (const fpath of files) {
    const buf = yield fs.readFile(fpath);
    const key = fpath.replace(path.resolve(__dirname, '../public'), '').slice(1);
    console.log(`Uploading to ${key}`);
    yield s3.uploadAsync({
      ACL: 'public-read',
      Bucket: BUCKET,
      ContentType: mime.lookup(fpath),
      Body: buf,
      Key: key,
    });
  }
});
