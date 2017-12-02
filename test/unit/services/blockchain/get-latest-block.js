import sinon from 'sinon';
import chai from 'chai';
import rp from 'request-promise';
import sinonChai from 'sinon-chai';
import getLatestBlock from '../../../../src/services/blockchain/get-latest-block';
import * as logger from '../../../../src/util/logger';
import * as config from '../../../../src/config';

chai.use(sinonChai);
const { expect } = chai;

describe('getLatestBlock', () => {
  const blockChainService = 'http://blockchain';
  const rpResponse = 'API response';
  let result;

  beforeEach(async () => {
    sinon.stub(rp, 'get').callsFake(() => Promise.resolve(rpResponse));
    sinon.stub(logger, 'logInfo').callsFake(() => {});
    sinon.stub(config);
    config.BLOCK_CHAIN_SERVICE = blockChainService;

    result = await getLatestBlock();
  });

  afterEach(() => {
    rp.get.restore();
    logger.logInfo.restore();
  });

  it('returns the value', () => {
    expect(result).to.equal('API response');
  });

  it('Request promise is called', async () => {
    expect(rp.get).to.have.been.calledWith(sinon.match({
      method: 'GET',
      uri: `${blockChainService}/latestblock`,
      json: true,
    }));
  });

  it('logInfo is called', async () => {
    expect(logger.logInfo).to.have.been.calledWith('Getting latest block');
  });
});
