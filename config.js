const path = require('path');

const config = {
  ROOT_DIR: __dirname,
  URL_PORT: process.env.PORT || 3000,
  URL_IP : process.env.IP || '0.0.0.0'
};
config.OPENAPI_YAML = path.join(config.ROOT_DIR, 'api', 'openapi.yaml');
module.exports = config;
