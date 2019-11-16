/* eslint-disable no-unused-vars */
const Service = require('./Service');
const ErrorMessagesService = require('./ErrorMessageService');
const RuntimeSession = require('./RunningSession');
const AnswerMessageService = require('./AnswersMessageService');
var mongodbUri = require('mongodb-uri');
const MongoClient = require('mongodb').MongoClient;

class UsersService {

    /**
     * An aggregate query
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns DocumentResultItem
     **/
    static databaseDatabaseNameCollectionNameAggregateGET(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).aggregate(JSON.parse(params.query)).toArray((err, items) => {
                        if (err) {
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        console.log("got ", items.length, " items !");
                        resolve(AnswerMessageService.documentsResult(items));
                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Query the database
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * returns DocumentResultItem
     **/
    static databaseDatabaseNameCollectionNameFindGET(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).find(JSON.parse(params.query)).toArray((err, items) => {
                        if (err) {
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        console.log("got ", items.length, " items !");
                        resolve(AnswerMessageService.documentsResult(items));
                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Insert one or multiple new documents in collection
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * returns InsertSuccessItem
     **/
    static databaseDatabaseNameCollectionNameInsertPOST(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    const collection = request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName);
                    let data = (Array.isArray(params.body)) ? params.body : [params.body];
                    console.log(data);
                    collection.insertMany(data, (err, result) => {
                        if (err) {
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }
                        console.log(err, result);
                        resolve(AnswerMessageService.insertDeleteUpdateSucess(result));
                    })

                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e))
                }
            },
        );
    }

    /**
     * find one item in the collection
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns SingleDocumentResultItem
     **/
    static databaseDatabaseNameCollectionNameOneGET(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).findOne(JSON.parse(params.query), (err, items) => {
                        if (err) {
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        console.log("got ", items.length, " items !");
                        resolve(AnswerMessageService.documentsResult(items));
                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Remove a document from the collection
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns ResultDeleteDocument
     **/
    static databaseDatabaseNameCollectionNameRemoveDELETE(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).deleteMany(JSON.parse(params.query), (err , result) => {
                        console.log(err, result);
                        if (err){
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        resolve(AnswerMessageService.insertDeleteUpdateSucess(result))

                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Remove a document from the collection
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns ResultDeleteDocument
     **/
    static databaseDatabaseNameCollectionNameRemoveOneDELETE(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).deleteOne(JSON.parse(params.query), (err , result) => {
                        console.log(err, result);
                        if (err){
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        resolve(AnswerMessageService.insertDeleteUpdateSucess(result))

                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * update a document
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns ResultUpdate
     **/
    static databaseDatabaseNameCollectionNameUpdateOnePUT(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).updateOne(JSON.parse(params.query), params.body, (err, result) => {
                        if (err){
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }
                        console.log(err, result);
                        resolve(AnswerMessageService.insertDeleteUpdateSucess(result));
                    });
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * find and modifiy one or many documents
     *
     * databaseName String Name of database
     * collectionName String Name of the desired collection
     * query String The query to be passed through mongoDB (optional)
     * returns ResultUpdate
     **/
    static databaseDatabaseNameCollectionNameUpdatePUT(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.userSession.getMongodbInstance().db(params.databaseName).collection(params.collectionName).updateMany(JSON.parse(params.query), params.body, (err, result) => {
                        if (err){
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }
                        console.log(err, result);
                        resolve(AnswerMessageService.insertDeleteUpdateSucess(result));
                    });
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Delete the database
     * Return informations about this delete action on the database
     *
     * databaseName String Name of database
     * returns DatabaseDeletedItem
     **/
    static databaseDatabaseNameDELETE(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    await request.userSession.getMongodbInstance().db(params.databaseName).dropDatabase();
                    resolve(AnswerMessageService.databaseDropedAnswer(params.databaseName))
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * Get information from database
     * Return informations about this single database
     *
     * databaseName String Name of database
     * returns SingleDatabaseInfoItem
     **/
    static databaseDatabaseNameGET(params, request) {
        return new Promise(
            async (resolve) => {
                try {
                    const databaseInfo = await request.userSession.getMongodbInstance().db(params.databaseName).stats();
                    const collectionsInfo = await request.userSession.getMongodbInstance().db(params.databaseName).listCollections().toArray();
                    const collectionStats = {};
                    for (const element of collectionsInfo)
                    {
                        collectionStats[element.name] = await request.userSession.getMongodbInstance().db(params.databaseName).collection(element.name).stats()
                    }
                    resolve(AnswerMessageService.databaseInfoResponse(databaseInfo, collectionStats));

                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * List available database for a given connection (token)
     * This endpoint allow users to list the available databases
     *
     * returns DatabaseListItemResponse
     **/
    static listDatabases(param, request) {
        return new Promise(
            async (resolve) => {
                try {
                    const databases = await request.userSession.getMongodbInstance().db().admin().listDatabases({nameOnly: true});
                    resolve(AnswerMessageService.databaseListAnswer(databases));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || 'Invalid input',
                        e.status || 405,
                    ));
                }
            },
        );
    }

    /**
     * Login to a remote database
     * The endpoint allows the user to log it self to a mongodb database. The returned object will inform the user of a potential faillure while trying to access the database. After N failed tries the server will stop responding to request comming from your IP. On login success you will get a uniq token with an expiration date. The token should be renewed before the expiration. You can do that be using the login endpoint with the old token and a new token will be issued.
     *
     * loginItemRequest LoginItemRequest Inventory item to add (optional)
     * returns loginItemResponse200
     **/
    static loginDatabase(loginItemRequest, request) {
        return new Promise(
            async (resolve) => {
                try {
                    const loginUrl = mongodbUri.format(loginItemRequest.body);
                    console.log(loginUrl);

                    MongoClient.connect(loginUrl, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }, (err, client) => {
                        if (err) {
                            console.error(err);
                            resolve(ErrorMessagesService.MongoDBErrorItemResponse(err));
                            return
                        }

                        const session = new RuntimeSession();
                        session.generateToekn();
                        session.setMongodbInstance(client);
                        request.app.authenticationManager.addSession(session);
                        resolve(AnswerMessageService.loginAnswer(session))
                    })
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e))
                }
            },
        );
    }

    /**
     * Logout from the API and the database
     *
     * returns logoutItem
     **/
    static logoutDatabase(param, request) {
        return new Promise(
            async (resolve) => {
                try {
                    request.app.authenticationManager.destroySession(request.userSession);
                    resolve(AnswerMessageService.logoutAnswer());
                } catch (e) {
                    resolve(ErrorMessagesService.MongoDBErrorItemResponse(e));
                }
            },
        );
    }

    /**
     * print the current status of the API
     * Returns an Object representing the current status of the API. Such as the number requests per second, the uptime, the version, a link to the associated documentation, and a list of available endpoints with required parameters
     *
     * returns statusItemResponse
     **/
    static printStatus() {
        return new Promise(
            async (resolve) => {
                try {
                    resolve(Service.successResponse(''));
                } catch (e) {
                    resolve(Service.rejectResponse(
                        e.message || 'Invalid input',
                        e.status || 405,
                    ));
                }
            },
        );
    }

}

module.exports = UsersService;
