import config from 'config';
import { fromCallback } from 'bluebird';
import mailgun from 'mailgun-js';
import createRouter from 'koa-router';
import getLocals from './locals';

const contactFormReceive = config.get('mail.contactFormReceive');

const mailer = mailgun(config.get('mailgun'));

const rootRouter = createRouter();

rootRouter.get('/', function *(next) {
  yield this.render('index', {});
});

rootRouter.post('/submit-form', function *() {
  const body = this.request.body;

  const data = {
    from: body.email,
    to: contactFormReceive,
    subject: `Contact Form Submit (from ${body.email})`,
    text: body.message,
  };

  yield fromCallback((done) => {
    mailer.messages().send(data, done);
  });

  this.redirect('back');
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
