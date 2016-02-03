import config from 'config';
import createRouter from 'koa-router';
import getLocals from './locals';
import submitForm from './routes/submit-form';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  this.redirect('/cn');
  // Temporary disable /en
  // yield this.render('index', {});
});

rootRouter.post('/submit-form', submitForm);

const contentRouter = createRouter();

contentRouter.get('/', function *(next) {
  const locals = yield getLocals('cn/home.md');
  yield this.render('home', locals);
});

contentRouter.get('/contact', function *() {
  yield this.render('contact', {});
});

contentRouter.get('/:page', function *(next) {
  const locals = yield getLocals(`${this.basePath}/${this.params.page}.md`);

  locals.article = locals.article.replace(
    /(<img) src="(\/img\/.+?)\.(\w+?)(")/g,
    `$1 srcset="${this.CDN}$2-200-@1x.$3 1x,${this.CDN}$2-200-@2x.$3 2x"$4`);

  locals.page_name = `article__${this.params.page}`;

  yield this.render('content', locals);
});

contentRouter.get('/faculty/:name', function *(next) {
  const locals = yield getLocals(`${this.basePath}/faculty/${this.params.name}.md`);

  locals.article = locals.article.replace(
    /(<img) src="(\/img\/.+?)\.(\w+?)(")/g,
    `$1 srcset="${this.CDN}$2-300-@1x.$3 1x,${this.CDN}$2-300-@2x.$3 2x"$4`);

  locals.page_name = 'article__faculty-detail';

  yield this.render('content', locals);
});

rootRouter.use('/(cn|en)', contentRouter.routes());

export default rootRouter.routes();
