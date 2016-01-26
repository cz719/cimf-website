import { join } from 'path';
import koa from 'koa';
import views from 'koa-views';

const app = koa();

app.use(views(join(__dirname, '../../template'), {
  map: {
    html: 'nunjucks'
  }
}));

app.use(function *(next) {
  yield this.render('index.html');
});

app.listen(10000);
