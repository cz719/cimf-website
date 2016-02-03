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
  yield this.render('content', locals);
});

contentRouter.get('/faculty/:name', function *(next) {
  const locals = yield getLocals(`${this.basePath}/faculty/${this.params.name}.md`);
  yield this.render('content', locals);
});

rootRouter.use('/(cn|en)', contentRouter.routes());

export default rootRouter.routes();
