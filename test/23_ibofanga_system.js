var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils'); 

var ses = new s();
var utils = new u();


describe("Ibofanga - Scripts for System APIs", function() {

    var jobStatusID = null;
    var enableFlag = null;
    var accountName = process.env.IBOFANGA_ACCOUNT_NAME;

    before(function (done) {
        ses.login()
        .end((err, res) => {            
            expect(res.statusCode).to.be.equal(200);
            ses._token =  "JWT " + res.body.data.token;
            done();
        });
    });

    it("Get all release notes", function(done) {
        console.log("Get all release notes");

        ses.get("ibofanga/system/release-note").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            done();
        });
    });

    it("Create a new sample release note", function(done) {
        console.log("Create a sample release note");

        var data = {
            "timestamp": utils.getDateInISOFormat(new Date()),
            "version": "x.x.x-y",
            "software_name": "Cloud UI-API",
            "internal_note": null,
            "external_note": "<p>Sample Relase note</p>\n"
        };

        ses.post("ibofanga/system/release-note", data).end((err,resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data.message).to.be.equal("Release Note successfully created");
            expect(resp.body.data.id).to.be.a('number');

            done();
        });
    });

    it("Get all job status dashboards", function(done) {
        ses.get("ibofanga/system/jobstatuses").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            jobStatusID = resp.body.data[0].id;
            enableFlag = resp.body.data.enabled;

            done();
        });
    });

    it("Update a job status dashboard", function(done) {
        console.log("Updating the job status for: " + jobStatusID);

        var data = {
            "enabled": !(enableFlag)
        };

        ses.patch("ibofanga/system/jobstatuses/" + jobStatusID, data).end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data.message).to.be.equal("Job status dashboard successfully updated");

            done();
        });
    });

    it("Get all errored messages", function(done) {

        ses.get("ibofanga/system/erroredmessages?per_page=10&page_no=1&sort_by_column=timestamp&sort_dir=DESC").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            done();
        });
    });

    it("Get all devices for System Map", function(done) {
        ses.post("ibofanga/system-map").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            done();
        });
    });

    it("Get all device types", function(done) {
        ses.get("ibofanga/devicetype?per_page=10&page_no=1&sort_by_column=&sort_dir=DESC").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            done();
        });
    });

    it("Get all System Permissions", function(done) {
        ses.get("permission").end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].id).to.be.a('number');

            done();
        });
    });

    it("Get all devices", function(done) {
        var queryString = "?per_page=10&page_no=1&filter_by_accountName=" + 
            encodeURIComponent(accountName) + 
            "&filter_by_system=TCNG&filter_by_status=deployed&filter_by_isactive=true" + 
            "&filter_by_ismigrated=true&sort_by_column=last_comm&sort_dir=DESC"
        ses.get("ibofanga/devices" + queryString).end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
            expect(resp.body.data[0].account.name).to.be.equal(accountName)

            done();
        });
    });
})
