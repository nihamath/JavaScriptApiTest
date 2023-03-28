var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('Modules', function () {
        var module;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it('should get a list of Modules', function(done){
            ses.get('entitlement/modules')
            .end((err, res) => {
                // console.log(res.body);
                expect(res.statusCode).to.be.equal(dataItem.moduleReadStatus);
                if (dataItem.moduleReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                }
                done();
            }); 
        });

    });
});
