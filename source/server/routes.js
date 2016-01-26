import createRouter from 'koa-router';

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index.html');
});

// Chinese

const cnRouter = createRouter();

cnRouter.get('/', function *(next) {
  yield this.render('home.html');
});

cnRouter.get('/content', function *(next) {
  yield this.render('home.html');
});

rootRouter.use('/cn', cnRouter.routes());

// English

const enRouter = createRouter();

enRouter.get('/', function *(next) {
  yield this.render('home.html');
});

enRouter.get('/content', function *(next) {
  yield this.render('home.html');
});

rootRouter.use('/en', enRouter.routes());

export default rootRouter.routes();
