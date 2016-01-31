import config from 'config';
import createRouter from 'koa-router';
import getLocals from './locals';
import submitForm from './routes/submit-form';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index', {});
});

rootRouter.post('/submit-form', submitForm);

function *contactHandler() {
  yield this.render('contact', {});
}

// Chinese
// ----------------------

const cnRouter = createRouter();

cnRouter.get('/', function *(next) {
  yield this.render('home', {});
});

cnRouter.get('/contact', contactHandler);

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
  yield this.render('contact', {});
});

enRouter.get('/contact', contactHandler);

rootRouter.use('/en', enRouter.routes());

export default rootRouter.routes();
