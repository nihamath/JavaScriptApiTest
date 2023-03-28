/**
 * Scripts for Ibofanga - Impersonation APIs
 */

require('dotenv-safe').config();

var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session')
    u = require('./utils');

var utils = new u();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {

    describe("Ibofanga - Scripts for Impersonation APIs", function() {
        
        var impersonateUser = process.env.IBOFANGA_IMPERSONATION_USER;
        var impersonateUserId = process.env.IBOFANGA_IMPERSONATION_USER_ID;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                var parsed_jwt = utils.parseJwt(ses._token);
                self_uesr_id = parsed_jwt.id;
                login_user = parsed_jwt.user_login;
                done();
            });
        });

        it("Start Impersonation", function(done) {
            console.log("Impersonating as user with id: " + impersonateUser);

            ses.post("ibofanga/start-impersonation/" + impersonateUserId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaImpersonation);
                if (dataItem.ibofangaImpersonation == 200) {
                    expect(resp.body.data.token).to.be.a('string').that.is.not.null;

                    ses._token = "JWT " + resp.body.data.token;
                }

                done();
            });
        });
        if (dataItem.ibofangaImpersonation == 200) {
            it("End Impersonation", function(done) {
                console.log("Ending the impersonation from user: " + impersonateUser);

                ses.post("ibofanga/end-impersonation").end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(dataItem.ibofangaImpersonation);
                    expect(resp.body.data.token).to.be.a('string').that.is.not.null;

                    ses._token = "JWT " + resp.body.data.token;

                    done();
                });
            });

            it("Should not impersonate themselves", function(done) {
                console.log("Trying to impersonate themselves. Using id: " + login_user);

                ses.post("ibofanga/start-impersonation/" + self_uesr_id).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.statusText).to.be.equal("You can't impersonate yourself!");

                    done();
                });
            });
        }

    });
});
