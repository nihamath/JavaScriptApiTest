/**
 * Script for Integration Accounts
 */

require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var ses = new s();

describe('Ibofanga - Child Accounts - API Testing', function() {

    before(function (done) {
        ses.login()
        .end((err, res) => {            
            expect(res.statusCode).to.be.equal(200);
            ses._token =  "JWT " + res.body.data.token;
            done();
        });
    });

    var account_id = process.env.DEVELOPER_ACCOUNT_ID;

    it("Get all Child accounts for the current account", function(done) {
        console.log("Getting all child accounts for the logged in account");

        ses.get('ibofanga/' + account_id + '/child-accounts').end((err, resp ) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;

            done();
        });
    });

});