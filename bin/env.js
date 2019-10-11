const fs = require('fs');
const path = require('path');

const env = (() => {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  if (NODE_ENV === 'production') {
    return process.env;
  } else {
    const filePath = path.join(__dirname, `../.env.${NODE_ENV}`);
    const defaultEnvVariables = require('dotenv')
      .parse(fs.readFileSync(filePath));

    const accumulatedVariables =  Object.keys(process.env).reduce((accumulator, envName) => {
      if (Object.keys(defaultEnvVariables).includes(envName)) {
        accumulator[envName] = process.env[envName];
      }
      return accumulator;
    }, {});

    return {
      ...defaultEnvVariables,
      ...accumulatedVariables,
    };
  }
})();

module.exports = env;
