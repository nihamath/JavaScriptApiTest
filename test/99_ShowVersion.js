var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); // TODO: move this to .env pull

    ses = new s();

describe('Sum Up', function () {
    it('Get Version', function(done){
        ses.get('version')
        .end(function (err, res){
            console.log(res.body.data);
            expect(res.body.data.version).to.be.an('string');
            expect(res.statusCode).to.be.equal(200);            
            done();
        });
    });
});