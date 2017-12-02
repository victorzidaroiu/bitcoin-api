import { getLatestBlock, getBlock } from '../services/blockchain';
import { getBTCToUSD } from '../services/coinbase';
import { MAX_BLOCKS } from '../config';

const satoshiToBTC = satoshi => satoshi * 0.00000001;

export default async (ctx) => {
  let { params: { blockCount } } = ctx;
  blockCount = parseInt(blockCount, 10);

  if (parseInt(MAX_BLOCKS, 10) < blockCount) {
    const error = new Error('Too many blocks requested');
    error.status = 400;

    throw (error);
  }

  const { height: latestBlockHeight } = await getLatestBlock();
  const usdExchangeRate = await getBTCToUSD();
  const blockHeights = [...Array(blockCount).keys()].map(i => latestBlockHeight - i);
  let blocks = await Promise.all(blockHeights.map(getBlock));

  blocks = blocks.map(({
    time, height, n_tx: transactionsCount, tx,
  }) => {
    let minTransaction = null;
    let maxTransaction = 0;
    let btcTotal = 0;

    const transactions = tx.map(({
      inputs, out, hash, relayed_by: relayedBy,
    }) => {
      const btc = out.reduce((acc, { value }) => acc + satoshiToBTC(value), 0);

      btcTotal += btc;

      if (!minTransaction || btc < minTransaction) {
        minTransaction = btc;
      }

      if (btc > maxTransaction) {
        maxTransaction = btc;
      }

      return {
        hash,
        btc,
        relayedBy,
        inputs: inputs.count,
        outputs: out.count,
        ioRatio: inputs.length / out.length,
      };
    });

    return {
      minTransaction,
      maxTransaction,
      avgTransaction: btcTotal / transactionsCount,
      btcTotal,
      time,
      height,
      transactionsCount,
      transactions,
    };
  });

  ctx.body = {
    usdExchangeRate,
    blocks,
  };
};
