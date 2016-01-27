import 'source-map-support/register';
import { join } from 'path';
import koa from 'koa';
import koaViews from 'koa-views';
import koaStatic from 'koa-static';
import routes from './routes';

const app = koa();

app.use(koaViews(join(__dirname, '../../template'), {
  map: {
    html: 'nunjucks'
  }
}));

app.use(koaStatic(join(__dirname, '../../public')));

app.use(routes);

app.listen(10000, () => console.log('listen on 10000'));
