// Scripts for the ALPR APIs

var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils');

var alpr_list;

var utils = new u();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('ALPR Listing and Filtering', function() {
        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it('Get All ALPR', function(done) {
            data = {};
            console.log("Getting all ALPR used for listing without any filter");
            ses.post('alpr?per_page=50&page_no=1&sort_by_column=timestamp&sort_dir=DESC').end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an('array');

                alpr_list = resp.body.data;

                done();
            });
        });

        it("Filter ALPR lisitng using a date range", function(done) {
            data = {
                start: "2018-06-20",
                end: "2018-06-21"
            };
            console.log("Getting all ALPR in date range from " + data["start"] + " to " + data["end"]);
            ses.post('alpr', data).end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an('array');
                done();
            });
        });

        it("Filtering ALPR listing with structure", function(done) {
            data = {
                structures: ["12300570"]
            };
            console.log("Getting all ALPR with structure id: " + data["structures"]);
            ses.post('alpr', data).end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an('array');
                done();
            });
        });

        it("Filtering ALPR listing with site", function(done) {
            data = {
                sites: [600000]
            };
            console.log("Getting all ALPR with site id: " + data["sites"]);
            ses.post('alpr', data).end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an('array');
                done();
            });
        });

        xit("Filtering ALPR listing with Member");

        xit("Get the details of an ALPR", function(done) {
            console.log("Getting details of ALPR with id: " + alpr_list[0].id);
            ses.get('alpr/list/' + alpr_list[0].id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);

                done();
            });
        })

    });
});
