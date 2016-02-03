'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _locals = require('./locals');

var _locals2 = _interopRequireDefault(_locals);

var _submitForm = require('./routes/submit-form');

var _submitForm2 = _interopRequireDefault(_submitForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootRouter = (0, _koaRouter2.default)();

rootRouter.get('/', function* (next) {
  this.redirect('/cn');
  // Temporary disable /en
  // yield this.render('index', {});
});

rootRouter.post('/submit-form', _submitForm2.default);

const contentRouter = (0, _koaRouter2.default)();

contentRouter.get('/', function* (next) {
  const locals = yield (0, _locals2.default)('cn/home.md');

  locals.article = locals.article.replace(/(<img) src="(\/img\/cim-img\/.+?)\.(\w+?)"/g, `$1 srcset="${ this.CDN }$2@1x.$3 1x,${ this.CDN }$2@2x.$3 2x"`);

  yield this.render('home', locals);
});

contentRouter.get('/contact', function* () {
  const locals = yield (0, _locals2.default)(`${ this.basePath }/contact.md`);
  yield this.render('contact', locals);
});

contentRouter.get('/:page', function* (next) {
  const locals = yield (0, _locals2.default)(`${ this.basePath }/${ this.params.page }.md`);

  switch (this.params.page) {
    case 'faculty':
      locals.article = locals.article.replace(/(<img) src="(\/img\/.+?)\.(\w+?)"/g, `$1 srcset="${ this.CDN }$2-200-@1x.$3 1x,${ this.CDN }$2-200-@2x.$3 2x"`);
      break;
    case 'cim':
      locals.article = locals.article.replace(/(<img) src="(\/img\/.+?)\.(\w+?)"/g, `$1 srcset="${ this.CDN }$2@1x.$3 1x,${ this.CDN }$2@2x.$3 2x"`);
      break;
  }

  locals.page_name = `article__${ this.params.page }`;

  yield this.render('content', locals);
});

contentRouter.get('/faculty/:name', function* (next) {
  const locals = yield (0, _locals2.default)(`${ this.basePath }/faculty/${ this.params.name }.md`);

  locals.article = locals.article.replace(/(<img) src="(\/img\/.+?)\.(\w+?)(")/g, `$1 srcset="${ this.CDN }$2-300-@1x.$3 1x,${ this.CDN }$2-300-@2x.$3 2x"`);

  locals.page_name = 'article__faculty-detail';

  yield this.render('content', locals);
});

rootRouter.use('/(cn|en)', contentRouter.routes());

exports.default = rootRouter.routes();
//# sourceMappingURL=routes.js.map