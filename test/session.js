require('dotenv-safe').config();
var supertest = require('supertest'),
    should = require('chai').should(),
    expect = require('chai').expect;
// use dotnet safe to set url

var user = null, pwd = null;
// set the api with the url
module.exports =  class Session {
    constructor (user, pwd){
        this._token =  "";
        this._home  = process.env.TEST_URL;
        this._url   = process.env.TEST_URL + '/v1/';
        this._user  = user ? user : process.env.TEST_USER;
        this._pw    = pwd ? pwd : process.env.TEST_PASSWORD;
        this.api    = supertest(this._url);
    }

    login () {
        console.log("      ---- Logging in as " + this._user + " ----");
        var pkg = {
            user_login: this._user,
            password: this._pw
        };
        return this.api.post('login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(pkg);
        // TODO: this should set the token, but that requires me to do the promise .then stuff correctly
        // right now the next test will start before the login is finished
    }

    get(url){
        return this.api.get(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', this._token);
    }

    delete(url){
        return this.api.delete(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', this._token);
    }

    patch(url, data){
        return this.api.patch(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', this._token)
        .send(data);
    }

    post(url, data){
        // console.log(url);
        // console.log(data);
        return this.api.post(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', this._token)
        .send(data);
    }

    put(url, data){
        // console.log(url);
        // console.log(data);
        return this.api.put(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', this._token)
        .send(data);
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    clear_token() {
        this._token = null;
    }
}