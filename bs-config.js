'use strict';

module.exports = {
  ui: false,
  files: [
    '_source-node5/server/**/*',
    'public/**/*',
    'source/client/img/**/*',
    'template/**/*',
  ],
  proxy: {
    target: 'http://0.0.0.0:10000',
  },
  ghostMode: false,
  notify: false,
  reloadDelay: 1000,
};
