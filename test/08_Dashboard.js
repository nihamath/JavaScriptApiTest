require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils');


var utils = new u();
var dashboard_data = {};

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {

    describe('Dashboard', function () {
        var dashboard;
        var testUserId = process.env.TEST_USER_ID,
            developerAccountId = process.env.DEVELOPER_ACCOUNT_ID;
        var dashboardName = "Dashboard created by script - " + dataItem.username;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                self_uesr_id = utils.parseJwt(ses._token).id;
                done();
            });
        });

        it('should get a list of Dashboards', function(done){
            ses.get('dashboard')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.dashboardReadStatus);
                if (dataItem.dashboardReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                    dashboard = res.body.data[0];
                }
                done();
            }); 
        });

        it("Create new dashboard", function(done) {

            dashboard_data = {
                "name": dashboardName,
                "description": dashboardName,
                "createdby": self_uesr_id,
                "account_id": developerAccountId,
                "auser_id": self_uesr_id,
                "isdefault": false
            };

            ses.post("dashboard", dashboard_data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.dashboardCreateStatus);
                if (dataItem.dashboardCreateStatus == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Dashboard successfully created");

                    newDashboardID = resp.body.data.id;
                }

                done();
            });
        });

        it("Edit widget in dashboard", function(done) {
            console.log("Editing widgets for the dashboard with id: " + newDashboardID);

            widget_data = {
                "add": [{
                    "params": "{\"source\":[12300057],\"refreshInterval\":[60],\"showTrend\":[true],\"showFullText\":[true]}","name":"Donut","xpos":0,"ypos":0,"widget_id":220000000,"height":2,"width":2}],"edit":[],"delete":[],"settings":[]};

            ses.patch("dashboard/" + newDashboardID + "/widgets", widget_data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.dashboardEditStatus);
                if (dataItem.dashboardEditStatus == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Dashboard successfully updated");
                }
    
                done();
            });
        });

        it('should get Dashboard Details', function(done){
            console.log("Get details of dashboard with id: " + newDashboardID);

            ses.get('dashboard/' + newDashboardID).end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.dashboardReadStatus);
                if (dataItem.dashboardReadStatus == 200) {
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.widgets).to.be.an('array').that.is.not.empty;
                }

                done();
            });
        });

        if (dataItem.dashboardCreateStatus == 200) {
            it("Should not create dashboard with duplicate name", function(done) {
                ses.post("dashboard", dashboard_data).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.status).to.be.equal(400);
                    expect(resp.body.statusText).to.be.equal("Dashboard name already exists");

                    done();
                });
            });
        }

        it("Get all the widgets", function(done){
            console.log("Getting all the available widgets for the current user");

            ses.get("dashboard/widgets").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.dashboardReadStatus);
                if (dataItem.dashboardReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                }

                done();
            });
        });

        it("Delete dashboard", function(done){
            console.log("Deleting a dashboard with id: " + newDashboardID);

            ses.delete("dashboard/" + newDashboardID).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.dashboardDeleteStatus);
                if (dataItem.dashboardDeleteStatus == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Dashboard successfully deleted");
                }

                done();
            });
        });

    });
});
