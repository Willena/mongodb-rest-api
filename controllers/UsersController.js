const Controller = require('./Controller');

class UsersController {
  constructor(Service) {
    this.service = Service;
  }

  async databaseDatabaseNameCollectionNameAggregateGET(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameAggregateGET);
  }

  async databaseDatabaseNameCollectionNameFindGET(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameFindGET);
  }

  async databaseDatabaseNameCollectionNameInsertPOST(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameInsertPOST);
  }

  async databaseDatabaseNameCollectionNameOneGET(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameOneGET);
  }

  async databaseDatabaseNameCollectionNameRemoveDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameRemoveDELETE);
  }

  async databaseDatabaseNameCollectionNameRemoveOneDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameRemoveOneDELETE);
  }

  async databaseDatabaseNameCollectionNameUpdateOnePUT(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameUpdateOnePUT);
  }

  async databaseDatabaseNameCollectionNameUpdatePUT(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameCollectionNameUpdatePUT);
  }

  async databaseDatabaseNameDELETE(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameDELETE);
  }

  async databaseDatabaseNameGET(request, response) {
    await Controller.handleRequest(request, response, this.service.databaseDatabaseNameGET);
  }

  async listDatabases(request, response) {
    await Controller.handleRequest(request, response, this.service.listDatabases);
  }

  async loginDatabase(request, response) {
    await Controller.handleRequest(request, response, this.service.loginDatabase);
  }

  async logoutDatabase(request, response) {
    await Controller.handleRequest(request, response, this.service.logoutDatabase);
  }

  async printStatus(request, response) {
    await Controller.handleRequest(request, response, this.service.printStatus);
  }

}

module.exports = UsersController;
