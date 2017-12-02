import rp from 'request-promise';
import { BLOCK_CHAIN_SERVICE } from '../../config';
import { logInfo } from '../../util/logger';

export default () => {
  logInfo('Getting latest block');

  return rp.get({
    method: 'GET',
    uri: `${BLOCK_CHAIN_SERVICE}/latestblock`,
    json: true,
  });
};
