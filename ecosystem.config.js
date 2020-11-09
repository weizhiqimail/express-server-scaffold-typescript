module.exports = {
  name: 'express-scaffold',
  script: 'cross-env NODE_ENV=production ts-node --files ./src/index.ts',
  output: 'logs/output.log',
  error: 'logs/error.log',
  env: {
    NODE_ENV: 'production',
  },
};
