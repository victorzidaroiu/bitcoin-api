import rp from 'request-promise';
import RedisNodeCache from 'redis-node-cache';
import { BLOCK_CHAIN_SERVICE, REDIS_URI } from '../../config';
import { logError, logInfo } from '../../util/logger';

let cache;

if (REDIS_URI) {
  cache = new RedisNodeCache({
    redisUrl: REDIS_URI,
    prefix: 'block-height-',
  });
}

const cacheTTL = 1000 * 60 * 30;

export default async (blockHeight) => {
  if (cache) {
    logInfo(`Getting block ${blockHeight}`);

    const block = await cache.get(blockHeight)
      .then(JSON.parse)
      .catch((error) => {
        logError(error);
      });

    if (block) {
      return block;
    }
  }

  const { blocks: [block] } = await rp({
    method: 'GET',
    uri: `${BLOCK_CHAIN_SERVICE}/block-height/${blockHeight}?format=json`,
    json: true,
  });

  cache.set(blockHeight, JSON.stringify(block), cacheTTL)
    .catch((error) => {
      logError(error);
    });

  return block;
};
