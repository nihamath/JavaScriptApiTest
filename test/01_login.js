var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); // TODO: move this to .env pull

    ses = new s();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('User Login Process', function () {
        it('should refuse bad login', function(done){
            data = {
                user_login: ses._user,
                password: 'BoogersAreCool'
            };
            ses.post('login', data)
            .end(function (err, res){
                expect(res.statusCode).to.be.equal(400);
                done();
            });
        });

        it('should accept a good login', function(done){
            data= {
                user_login: dataItem.username,
                password:  dataItem.password
            };
            ses.post('login', data)
            .end(function (err, res){
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.token);
                ses._token = "JWT " + res.body.data.token;
                done();
            });
        });

        it('should refresh token', function(done){
            data = {token: ses._token};
            ses.post('login/refresh-token', data)
            .expect('Content-Type', /json/)
            .end(function (err, res){
                // console.log(res);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.token);
                done();
            });
        });
    });
});