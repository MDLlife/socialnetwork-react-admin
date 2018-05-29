import jwt_decode from 'jwt-decode';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
    localStorage = require('localStorage')
} else {
    // If not, use the browser one
    localStorage = global.window.localStorage
}

let auth = {
    /**
     * Logs a user in, returning a promise with `true` when done
     */
    login (token) {
        // Save token to local storage
        // console.log("Save token to local storage, ", token);
        localStorage.token = token
        return Promise.resolve(true)
    },
    /**
     * Logs the current user out
     */
    logout () {
        localStorage.token = null;
        return Promise.resolve(true)
    },
    /**
     * Checks if a user is logged in
     */
    loggedIn () {
        return !!localStorage.token
    },

    getUser(){
        var usr = localStorage.token ? jwt_decode(localStorage.token) : {};
        // console.log("Get User, ",usr);

        //fire get user details request
        return usr;
    }
};

export default auth;
