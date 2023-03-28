/**
 * Script for Roles APIs
 */


var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe("Roles", function() {
        var roles_list;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get the role list", function(done) {
            ses.get("roles").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.roleRead);
                if (dataItem.roleRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    roles_list = resp.body.data;
                    console.log("Number of roles: " + roles_list.length);
                }

                done();
            });
        });

        if (dataItem.roleRead == 200) {
            it("Get the details of a role", function(done) {
                var some_role = roles_list[0];
                ses.get('roles/' + roles_list[0].id).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(200);
                    expect(resp.body.data.id).to.be.equal(some_role.id);
                    expect(resp.body.data.name).to.be.equal(some_role.name);
                    console.log("Got details for role: " + resp.body.data.id + " - " + resp.body.data.name);

                    done();
                })
            });
        }
    });
});