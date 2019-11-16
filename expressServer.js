// const { Middleware } = require('swagger-express-middleware');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { OpenApiValidator } = require('express-openapi-validator');
const openapiRouter = require('./utils/openapiRouter');
const AuthenticationManager = require('./services/AuthenticationManager');
const ErrormMessageService = require('./services/ErrorMessageService');
const logger = require('./logger');

class ExpressServer {
  constructor(port, openApiYaml) {
    console.log(openApiYaml)
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;
    this.schema = yamljs.load(openApiYaml);
    this.setupMiddleware();
  }

  setupMiddleware() {

    // this.setupAllowedMedia();
    this.app.authenticationManager = new AuthenticationManager();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.get('/spec', express.static(this.openApiPath));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    new OpenApiValidator({
      apiSpec: this.openApiPath,
      validateResponses: true,
      securityHandlers: {
        ApiKeyAuth: (req, scopes, schema) => {
          if (req.app.authenticationManager.hasToken(req.headers['x-token'])){
            req.userSession = req.app.authenticationManager.getSession(req.headers['x-token'])
            return true;
          }

          throw ErrormMessageService.UnauthorizedItemResponse(undefined)
        }
      }
    }).install(this.app);

    this.app.use(openapiRouter());
  }

  addErrorHandler() {
    this.app.use('*', (req, res) => {
      res.status(404);
      res.send(JSON.stringify({ error: `path ${req.baseUrl} doesn't exist` }));
    });
    /**
     * suppressed eslint rule: The next variable is required here, even though it's not used.
     *
     ** */
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      const errorResponse = error.error || error.errors || error.message || 'Unknown error';
      res.status(error.status || 500);
      res.type('json');
      res.json({ error: errorResponse });
    });
  }

  async launch() {
    return new Promise(
      async (resolve, reject) => {
        try {
          this.addErrorHandler();
          this.server = await this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
            resolve(this.server);
          });
        } catch (error) {
          reject(error);
        }
      },
    );
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
