import 'source-map-support/register';
import './config';
import { join } from 'path';
import config from 'config';
import koa from 'koa';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import koaLocale from 'koa-locale';
import koai18n from 'koa-i18n';
import koaBodyparser from 'koa-bodyparser';
import routes from './routes';

const CDN = config.get('CDN');

const app = koa();

koaLocale(app);

// Provide convenience for links in template
app.use(function *(next) {
  this.basePath = /\/cn/i.test(this.url) ? 'cn' : 'en';
  this.CDN = CDN;
  yield next;
});

app.use(koai18n(app, {
  locales:['en', 'zh-CN'],
  directory: join(__dirname, '../../locales'),
  modes: [
    'query', // ?locale=zh-CN
    function () {
      return this.basePath === 'cn' ? 'zh-CN' : 'en';
    },
  ],
}));

app.use(koaViews(join(__dirname, '../../template'), {
  extension: 'ejs'
}));

app.use(function *(next) {

  const b = this.basePath;
  const i18n = this.i18n;

  const navigations = [
    { href: `/${b}/faculty`, text: i18n.__('Faculty') },
    { href: `/${b}/activity`, text: i18n.__('Activity') },
    { href: `/${b}/competition`, text: i18n.__('Competition') },
    { href: `/${b}/apply`, text: i18n.__('Apply') },
    { href: `/${b}/cim`, text: i18n.__('CIM') },
    { href: `/${b}/regulation`, text: i18n.__('Regulation') },
    { href: `/${b}/contact`, text: i18n.__('Contact') },
  ];

  this.state = {
    i18n: this.i18n,
    basePath: this.basePath,
    navigations,
    CDN,
  };

  yield next;
});

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    console.error(err.stack);
    this.status = 500;
  }
});

app.use(koaBodyparser());
app.use(koaStatic(join(__dirname, '../../public')));
app.use(koaStatic(join(__dirname, '../../source/client')));

app.use(routes);

app.listen(process.env.PORT || 10000, () => console.log('listen on 10000'));
