var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 
ses = new s();
var api = ses.api;    

describe('Pending Test Holding area', function () {
    
    before(function (done) {
        ses.login()
        .end((err, res) =>{            
            expect(res.statusCode).to.be.equal(200);
            ses._token =  "JWT " + res.body.data.token;
            done();
        });
    });
     
    it('Ibofanga Name Space /v1/ibofanga');
    it( '/v1/accounttype');
    it( '/v1/cardinaldirection');
    it( '/v1/beacon');
    it( '/v1/ticket');

});