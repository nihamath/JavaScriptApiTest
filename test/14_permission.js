/* Scripts to test the permission APIs */

var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe("Permissions", function() {

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get all the permissions for the user", function(done) {
            console.log("Getting the permissions available for the logged in user!");
            ses.get("permission").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.permissionView);
                if (dataItem.permissionView == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    console.log("Number of permissions filtered: " + resp.body.data.length);
                }
                done();
            });
        });
    });
});