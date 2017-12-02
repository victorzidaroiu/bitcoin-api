import dotenv from 'dotenv';

dotenv.config();

export const {
  SERVER_PORT,
  BLOCK_CHAIN_SERVICE,
  REDIS_URI,
  MAX_BLOCKS,
  COINBASE_SERVICE,
} = process.env;
