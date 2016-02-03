'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _co = require('co');

var _fs = require('mz/fs');

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _remarkHtml = require('remark-html');

var _remarkHtml2 = _interopRequireDefault(_remarkHtml);

var _remarkYaml = require('remark-yaml');

var _remarkYaml2 = _interopRequireDefault(_remarkYaml);

var _jsYaml = require('js-yaml');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processor = (0, _remark2.default)().use(_remarkYaml2.default).use(_remarkHtml2.default, { entities: 'escape' });
const parser = (0, _remark2.default)().use(_remarkYaml2.default);

exports.default = (0, _co.wrap)(function* (fpath) {
  const md = yield (0, _fs.readFile)((0, _path.join)(__dirname, '../../content', fpath), 'utf8');
  const article = processor.process(md, { gfm: true });
  const config = (0, _jsYaml.safeLoad)(parser.parse(md).children[0].value);
  return { config, article };
});
//# sourceMappingURL=locals.js.map