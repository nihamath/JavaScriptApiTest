/**
 * Script for ibofanga APIs
 */

require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var ses = new s();


describe('Ibofanga ALPR API Testing', function() {
    
    before(function (done) {
        ses.login()
        .end((err, res) => {            
            expect(res.statusCode).to.be.equal(200);
            ses._token =  "JWT " + res.body.data.token;
            done();
        });
    });

    var alpr_list;
    
    it("Get the list of All ALPR", function(done) {
        it('Get All ALPR', function(done) {
            data = {};
            console.log("Getting all ALPR used for listing without any filter");
            ses.post('alpr').end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an('array');
    
                alpr_list = resp.body.data;
    
                done();
            });
        });
    });

    it("Get the context image of an ALPR", function(done) {
        console.log("Getting details of ALPR with id: " + alpr_list[0].id);
        ses.get('alpr/contextimage/' + alpr_list[0].id).end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            console.log(resp.body);
        });
        done();
    });

    it("Get the Plate Image of an ALPR");


});