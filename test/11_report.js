var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils');

var utils = new u();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('Report Namespace', function () {
        var struct_id,
        data = {},
        self_uesr_role = null;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                self_uesr_role = utils.parseJwt(ses._token).accounts[0].role_name;
                console.log(self_uesr_role);
                done();
            });
        });

        before(function (done) {
            ses.get('structure')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                struct_id = res.body.data[0].id;
                done();
            });  
        });

        it("Report - Auth", function(done) {
            data = {
                "user_email": dataItem.username,
                "role": self_uesr_role
            };

            ses.post("report/auth", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data.key).to.be.a('string');

                done();
            })
        });

        it('should Get structure entries and exits', function(done){
            data = {
                structure_id: struct_id
            }; 
            // console.log(data);
            ses.post('report/parking_count', data)
            .end((err, res) => {
                // console.log(res.body);
                expect(res.statusCode).to.be.equal(200);      
                done();
            });
            
        });
    
        it('should Get structure entries and exits with occupancy', function(done){
            // consol.log()
            data = {
                minutes: 360,
                structure_id: struct_id
            };
            ses.post('report/parking_interval', data)
            .end((err, res) => {
                // console.log(res.body);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.data).to.be.an('object');      
                expect(res.body.data.timeline).to.be.an('array').that.is.not.empty;
                done();
            });
        });

        it('should NOT Get structure entries and exits with occupancy for another account', function(done){
            data = {
                minutes: 360,
                structure_id: parseInt(struct_id) + 100
            };
            ses.post('report/parking_interval', data)
            .end((err, res) => {
                console.log(res.body);
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.data).to.be.an('object').that.is.empty;
                // expect(res.body.data).to.be.an('object');      
                // expect(res.body.data.timeline).to.be.an('array').that.is.not.empty;
                done();
            });
        });

        it ("Get all alert types", function (done) {
            console.log("Getting the alert types");

            ses.get("alert/alerttype").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array").that.is.not.empty;
                alert_type = resp.body.data[0].type;

                done();
            });
        });

        it("Get Alert History Data", function(done) {
            console.log("Getting all the alert history data for alert type: " + alert_type);

            data = {
                "alert_number": 10,
                "alert_types": [alert_type]
            };

            ses.post("report/recent_alerts", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array").that.is.not.empty;

                done();
            });
        });

        it("Get sites", function(done) {
            console.log("Getting all the sites");

            ses.get("site?hidden=false").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array").that.is.not.empty;
                site_id = resp.body.data[0].id;

                data = {
                    "site_id": site_id,
                    "lanes": [1],
                    "timestamp": new Date().toISOString()
                };

                done();

            });
        });

        it("Get Volume Over Time data", function(done) {
            console.log("Getting the Volume Over Time data");

            ses.post("report/volume_overtime", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("object");
                expect(resp.body.data.timeline).to.be.an("array");

                done();
            });
        });

        it("Get Volume Over Time With Speed data", function(done) {
            console.log("Getting the Volume Over Time With Speed data");

            ses.post("report/volume_overtime_speed", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("object");
                expect(resp.body.data.timeline).to.be.an("array");

                done();
            });
        });

        it("Get Current Flood Sensor Status data", function(done) {
            console.log("Getting the Flood sensor level data");

            data = {"site_id":site_id};
            ses.post("report/getFloodSensorLevel", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

        it("Get Flood Sensor History data", function(done) {
            console.log("Getting the Flood Sensor History Data");

            data = {
                "site_id": site_id,
                "interval": new Date().toISOString()
            };
            ses.post("report/getFloodSensorHistory", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

        it("Get data for Parking Interval range by Structure", function(done) {
            console.log("Getting the data for Parking Interval range by Structure");

            today = new Date();
            lastWeekDate = new Date();
            lastWeekDate.setDate(today.getDate() - 7);
            data = {
                "startTs": today.toISOString(),
                "endTs": lastWeekDate.toISOString(),
                "structure_id": struct_id
            };

            ses.post("report/parking_interval/rangeByStructure", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

        it("Get the devicetype based device list", function(done) {
            console.log("Getting the device list based on device types");

            ses.get("devicetype?includedevicelist=true").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("object").that.is.not.empty;
                device_list = resp.body.data;
                device_id = device_list[Object.keys(device_list)[0]][0].id;

                done();
            });
        });

        it("Get data for Praking Interval with range by device", function(done) {
            console.log("Getting data for Praking Interval with range by device");

            today = new Date();
            lastWeekDate = new Date();
            lastWeekDate.setDate(today.getDate() - 7);
            data = {
                "startTs": today.toISOString(),
                "endTs": lastWeekDate.toISOString(),
                "device_id": device_id
            };

            ses.post("report/parking_interval/rangeByDevice", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

        it("Get data for the prediction interval", function(done) {
            console.log("Getting data for the prediction interval");

            data = {
                "minutes": 30,
                "structure_id": struct_id,
                "prediction_interval": 60
            };

            ses.post("report/prediction_interval", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

        it("Get data for Occupancy Bounds", function(done) {
            console.log("Getting data for Occupancy Bounds");

            data = {
                "structure_id": struct_id,
                "timestamp": new Date().toISOString()
            };

            console.log(data);

            ses.post("report/occupancy_bounds", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data).to.be.an("array");

                done();
            });
        });

    });
});
