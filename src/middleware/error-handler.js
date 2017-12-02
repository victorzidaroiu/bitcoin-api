import { logError } from '../util/logger';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logError(err.message);

    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
};
