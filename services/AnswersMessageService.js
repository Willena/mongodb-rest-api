const Service = require('./Service');

module.exports.loginAnswer = function (session) {
    return Service.successResponse({success: true, token: session.getToken()})
};

module.exports.logoutAnswer = function (session) {
    return Service.successResponse({success: true})
};

module.exports.databaseListAnswer = function (databases) {
    databases_out = [];

    for (base of databases.databases) {
        databases_out.push(base.name)
    }

    return Service.successResponse({success: true, databases: databases_out})
};

module.exports.databaseDropedAnswer = function (name) {
    return Service.successResponse({success: true, name: name})
};

module.exports.documentsResult = function (items) {
    return Service.successResponse({success: true, data: items})
};

module.exports.insertDeleteUpdateSucess = function (result) {
    return Service.successResponse({success: true, count: result.result.n})
};
