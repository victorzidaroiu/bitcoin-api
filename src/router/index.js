import Router from 'koa-router';
import transactions from './transactions';

const router = new Router({
  prefix: '/api/v1',
});

router.get('/blocks/:blockCount', transactions);

export default router;
