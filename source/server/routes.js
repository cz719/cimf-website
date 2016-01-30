import createRouter from 'koa-router';
import getLocals from './locals';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index', {});
});

rootRouter.post('/submit-form', function () {
  this.body = this.req.body;
});

// Chinese
// ----------------------

const cnRouter = createRouter();

cnRouter.get('/', function *(next) {
  yield this.render('home', {});
});

cnRouter.get('/contact', function *(next) {
  yield this.render('contact', {});
});

cnRouter.get('/:page', function *(next) {
  const locals = yield getLocals(this.params.page);
  yield this.render('content', locals);
});

rootRouter.use('/cn', cnRouter.routes());

// English
// ----------------------

const enRouter = createRouter();

enRouter.get('/', function *(next) {
  yield this.render('home', {});
});

enRouter.get('/content', function *(next) {
  yield this.render('content', {});
});

rootRouter.use('/en', enRouter.routes());

export default rootRouter.routes();
