import rp from 'request-promise';
import { COINBASE_SERVICE } from '../../config';
import { logInfo } from '../../util/logger';

export default async () => {
  logInfo('Getting Bitcoin to USD conversion rate');

  const response = await rp({
    method: 'GET',
    uri: `${COINBASE_SERVICE}/v1/bpi/historical/close.json?for=yesterday`,
    json: true,
  });

  return Object.values(response.bpi)[0];
};
