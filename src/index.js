import Koa from 'koa';
import { SERVER_PORT } from './config';
import router from './router';
import errorHandler from './middleware/error-handler';

const app = new Koa();

app.use(errorHandler);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(SERVER_PORT);
