'use strict';

require('source-map-support/register');

require('./config');

var _path = require('path');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaLocale = require('koa-locale');

var _koaLocale2 = _interopRequireDefault(_koaLocale);

var _koaI18n = require('koa-i18n');

var _koaI18n2 = _interopRequireDefault(_koaI18n);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CDN = _config2.default.get('CDN');

const app = (0, _koa2.default)();

(0, _koaLocale2.default)(app);

// Provide convenience for links in template
app.use(function* (next) {
  this.basePath = /\/cn/i.test(this.url) ? 'cn' : 'en';
  this.CDN = CDN;
  yield next;
});

app.use((0, _koaI18n2.default)(app, {
  locales: ['en', 'zh-CN'],
  directory: (0, _path.join)(__dirname, '../../locales'),
  modes: ['query', // ?locale=zh-CN
  function () {
    return this.basePath === 'cn' ? 'zh-CN' : 'en';
  }]
}));

app.use((0, _koaViews2.default)((0, _path.join)(__dirname, '../../template'), {
  extension: 'ejs'
}));

app.use(function* (next) {

  const b = this.basePath;
  const i18n = this.i18n;

  const navigations = [{ href: `/${ b }/faculty`, text: i18n.__('Faculty') }, { href: `/${ b }/activity`, text: i18n.__('Activity') }, { href: `/${ b }/competition`, text: i18n.__('Competition') }, { href: `/${ b }/apply`, text: i18n.__('Apply') }, { href: `/${ b }/cim`, text: i18n.__('CIM') }, { href: `/${ b }/regulation`, text: i18n.__('Regulation') }, { href: `/${ b }/contact`, text: i18n.__('Contact') }];

  this.state = {
    i18n: this.i18n,
    basePath: this.basePath,
    navigations,
    CDN
  };

  yield next;
});

app.use(function* (next) {
  try {
    yield next;
  } catch (err) {
    console.error(err.stack);
    this.status = 500;
  }
});

app.use((0, _koaBodyparser2.default)());
app.use((0, _koaStatic2.default)((0, _path.join)(__dirname, '../../public')));
app.use((0, _koaStatic2.default)((0, _path.join)(__dirname, '../../source/client')));

app.use(_routes2.default);

app.listen(process.env.PORT || 10000, () => console.log('listen on 10000'));
//# sourceMappingURL=index.js.map