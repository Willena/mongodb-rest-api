const Service = require('./Service');

module.exports.UnauthorizedItemResponse = function (message) {
    if (message)
        return Service.rejectResponse({success: false, message: message, retires: 3}, 401)
    else
        return Service.rejectResponse({
            success: false,
            message: "You are not authorized to access this. Did you login ?",
            retires: 3
        }, 401)
};

module.exports.ForbidenItemResponse = function () {
    return Service.rejectResponse({
            success: false, message: "Access to the api is forbidden"
        }, 403
    )
};

module.exports.MongoDBErrorItemResponse = function (message, errorCode) {
    return Service.rejectResponse({
        "success": false,
        "message": message.message || message,
        "code": errorCode || -1
    }, 500)
};
