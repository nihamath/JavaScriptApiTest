global.atob = require("atob");

module.exports =  class Utils {

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getDateInISOFormat(date) {
        return date.toISOString();
    }

    addYears(date, n, isoFormat) {
        var dt = new Date(date.setFullYear(date.getFullYear() + n));

        if (isoFormat == true) {
            return this.getDateInISOFormat(dt);
        } else {
            return dt;
        }
    }

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
}