import config from 'config';
import createRouter from 'koa-router';
import getLocals from './locals';
import submitForm from './routes/submit-form';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index', {});
});

rootRouter.post('/submit-form', submitForm);

const contentRouter = createRouter();

contentRouter.get('/', function *(next) {
  yield this.render('home', {});
});

contentRouter.get('/contact', function *() {
  yield this.render('contact', {});
});

contentRouter.get('/:page', function *(next) {
  const locals = yield getLocals(this.params.page);
  yield this.render('content', locals);
});

rootRouter.use('/(cn|en)', contentRouter.routes());

export default rootRouter.routes();
