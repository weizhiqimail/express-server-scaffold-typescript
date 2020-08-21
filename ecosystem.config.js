const pkg = require('./package.json');

module.exports = {
  name: pkg.name,
  script: './src/index.js',
  output: 'logs/out.log',
  error: 'logs/error.log',
  env: {
    NODE_ENV: 'production',
  },
};
