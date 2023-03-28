var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('Entitlements', function () {
        var ent;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it('should get a list of Entitlements', function(done){
            ses.get('entitlement')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.entitlementReadStatus);
                if(dataItem.entitlementReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                    ent = res.body.data[0];
                }
                done();
            }); 
        });

        it('should get a Entitlement Package' , function(done){
            ses.get('entitlement/package/' + ent.id)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.entitlementReadStatus);
                if(dataItem.entitlementReadStatus == 200) {
                    expect(res.body.data).to.be.an('object');
                }

                done();
            }); 
        });

        it("Get the modules", function(done) {
            ses.get("entitlement/modules").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.moduleReadStatus);
                if (dataItem.moduleReadStatus == 200) {
                    expect(resp.body.data).to.be.an("array").that.is.not.empty;
                    expect(resp.body.data[0].id).to.be.a("number");
                }

                done();
            });
        });

    });
});
