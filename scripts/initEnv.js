const fs = require('fs');
const dotenv = require('dotenv');

function initEnv() {
  const nodeEnvTypes = ['development', 'production', 'test'];

  if (!nodeEnvTypes.includes(process.env.NODE_ENV)) {
    process.env.NODE_ENV = nodeEnvTypes[0];
  }

  const dotenvFiles = [
    '.env',
    '.env.local',
    `.env.${process.env.NODE_ENV}`,
    `.env.${process.env.NODE_ENV}.local`,
  ].filter(fs.existsSync);

  dotenvFiles
    .reverse()
    .forEach(dotenvFile => dotenv.config({ path: dotenvFile }));
}

initEnv();

module.exports = initEnv;