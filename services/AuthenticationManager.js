class AuthenticationManager {
    constructor() {
        this.sessions = {}
    }


    hasToken(token) {
        if (!token)
            return false;
        return this.sessions.hasOwnProperty(token)
    }

    async destroySession(session) {
        if (!this.hasToken(session.token)) {
            return false
        }

        await this.sessions[session.token].close();
        delete this.sessions[session.token];
        return true
    }

    async destroyToken(token) {
        if (!this.hasToken(token)) {
            return false
        }

        await this.sessions[token].close();
        delete this.sessions[token];

        return true
    }

    addSession(session) {
        if (session.token || session.mongodbInstance) {
            this.sessions[session.token] = session;
            return true
        }

        return false
    }

    getSession(token){
        if (this.hasToken(token))
            return this.sessions[token]
    }
}

module.exports = AuthenticationManager;
