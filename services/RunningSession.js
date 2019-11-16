const uuidv4 = require('uuid/v4');

class RunningSession {

    constructor() {
        this.mongodbInstance = null;
        this.token = null;
    }

    getToken() {
        return this.token
    }

    getMongodbInstance() {
        return this.mongodbInstance
    }

    setMongodbInstance(instance) {
        this.mongodbInstance = instance
    }

    generateToekn() {

        this.token = uuidv4();
        return this.token
    }


    close(){
        this.mongodbInstance.close()
    }
}

module.exports = RunningSession;
