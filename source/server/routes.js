import createRouter from 'koa-router';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index');
});

// Chinese

const cnRouter = createRouter();

cnRouter.get('/', function *(next) {
  yield this.render('home');
});

cnRouter.get('/content', function *(next) {
  yield this.render('home');
});

rootRouter.use('/cn', cnRouter.routes());

// English

const enRouter = createRouter();

enRouter.get('/', function *(next) {
  yield this.render('home');
});

enRouter.get('/content', function *(next) {
  yield this.render('home');
});

rootRouter.use('/en', enRouter.routes());

export default rootRouter.routes();
