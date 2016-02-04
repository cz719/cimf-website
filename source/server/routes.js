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

  locals.article = locals.article.replace(
    /(<img) src="(\/img\/cim-img\/.+?)\.(\w+?)"/g,
    `$1 srcset="${this.CDN}$2@1x.$3 1x,${this.CDN}$2@2x.$3 2x"`);

  locals.article = locals.article.replace(
    /(<img) src="(\/img\/logo\/.+?)\.(\w+?)"/g,
    `$1 src="${this.CDN}$2.$3"`);

  locals.page_name = 'home';

  yield this.render('home', locals);
});

contentRouter.get('/contact', function *() {
  const locals = yield getLocals(`${this.basePath}/contact.md`);
  locals.page_name = 'contact';
  yield this.render('contact', locals);
});

contentRouter.get('/:page', function *(next) {
  const locals = yield getLocals(`${this.basePath}/${this.params.page}.md`);

  switch (this.params.page) {
  case 'faculty':
    locals.article = locals.article.replace(
      /(<img) src="(\/img\/.+?)\.(\w+?)"/g,
      `$1 srcset="${this.CDN}$2-200-@1x.$3 1x,${this.CDN}$2-200-@2x.$3 2x"`);
    break;
  case 'cim':
    locals.article = locals.article.replace(
      /(<img) src="(\/img\/.+?)\.(\w+?)"/g,
      `$1 srcset="${this.CDN}$2@1x.$3 1x,${this.CDN}$2@2x.$3 2x"`);
    break;
  }

  locals.page_name = `article__${this.params.page}`;

  yield this.render('content', locals);
});

contentRouter.get('/faculty/:name', function *(next) {
  const locals = yield getLocals(`${this.basePath}/faculty/${this.params.name}.md`);

  locals.article = locals.article.replace(
    /(<img) src="(\/img\/.+?)\.(\w+?)(")/g,
    `$1 srcset="${this.CDN}$2-300-@1x.$3 1x,${this.CDN}$2-300-@2x.$3 2x"`);

  locals.page_name = 'article__faculty-detail';

  yield this.render('content', locals);
});

rootRouter.use('/(cn|en)', contentRouter.routes());

export default rootRouter.routes();
