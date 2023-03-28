
/**
 * Ibofanga API test scripts for devices
 */

var should = require('chai').should(),
    expect = require('chai').expect,
    uuid = require('uuid'),
    s = require('./session'),
    u = require('./utils'); 

var utils = new u();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {

    describe("Ibofanga Device API Testing", function() {

        var deviceTypesList, randomDeviceType, newDeviceId;
        var deviceName = "EQ-BY-SCRIPT";
        var serialNumber = "EQ-BY-SCRIPT-001";
        var newDeviceId = "765379"
        var uuid_string;
        
        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get all the devices", function(done) {
            console.log("Getting all the devices");
            ses.get("ibofanga/device").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceRead);
                if (dataItem.ibofangaDeviceRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                }

                done();
            });
        });

        it("Get all device types", function(done) {
            console.log("Get all device types available");

            ses.get("ibofanga/devicetype").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceRead);
                if (dataItem.ibofangaDeviceRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;

                    deviceTypesList = resp.body.data;
                    randomDeviceType = deviceTypesList[utils.getRandomInt(0, deviceTypesList.length)];
                }

                done();
            });
        });

        it("Create Device", function(done) {
            console.log("Create a new device");

            uuid_string = uuid();

            data = {
                "nickname": deviceName,
                "description": null,
                "salesforce_id": null,
                "serialnumber": serialNumber,
                "status": "virtual",
                "smartapps_id": null,
                "thingworx_id": null,
                "is_stolen": false,
                "last_comm": 1536305557961,
                "next_comm": 1536305557961,
                "system": "TCNG",
                "accesskey": uuid_string,
                "account_id": 500541,
                "devicetype_id": randomDeviceType ? randomDeviceType.id.toString() : "200000",
                "controlboard_id": null,
                "updatets": 1536305557961,
                "jsettings": randomDeviceType ? randomDeviceType.default_jsettings: {},
                "latitude": 40.763864,
                "longitude": -77.877955
            };


            ses.put("ibofanga/device", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceCreate);
                if (dataItem.ibofangaDeviceCreate == 200) {
                    expect(resp.body.data.message).to.be.equal("Device successfully created");
                    expect(resp.body.data.id).to.be.a('number');

                    newDeviceId = resp.body.data.id;
                }

                done();
            });
        });
        if (dataItem.ibofangaDeviceCreate == 200) {
            it("Should not create duplicate device with same serial number", function(done) {
                console.log("Same devices with same serial number should not be created");
                data = {
                    "nickname": deviceName,
                    "description": null,
                    "salesforce_id": null,
                    "serialnumber": serialNumber,
                    "status": "virtual",
                    "smartapps_id": null,
                    "thingworx_id": null,
                    "is_stolen": false,
                    "last_comm": 1536305557961,
                    "next_comm": 1536305557961,
                    "system": "TCNG",
                    "accesskey": uuid_string,
                    "account_id": 500541,
                    "devicetype_id": randomDeviceType ? randomDeviceType.id.toString() : "200000",
                    "controlboard_id": null,
                    "updatets": 1536305557961,
                    "jsettings": randomDeviceType ? randomDeviceType.default_jsettings: {},
                    "latitude": 40.763864,
                    "longitude": -77.877955
                };
                
                ses.put("ibofanga/device", data).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.statusText).to.be.equal("This Serial Number already exists");

                    done();
                });
                
            });
        }

        it("Get a device by Id", function(done) {
            console.log("Get a device by id: " + newDeviceId);

            ses.get("ibofanga/device/" + newDeviceId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceRead);
                if (dataItem.ibofangaDeviceRead == 200) {
                    expect(resp.body.data.id).to.be.equal(parseInt(newDeviceId));
                    expect(resp.body.data.nickname).to.be.equal(deviceName);
                }

                done();
            });
        });

        it("Update a device", function(done) {
            console.log("Update a device with id: " + newDeviceId + " nickname: " + deviceName);

            data = {
                "nickname": deviceName + " - updated",
                "description": null,
                "salesforce_id": null,
                "serialnumber": serialNumber,
                "status": "virtual",
                "smartapps_id": null,
                "thingworx_id": null,
                "is_stolen": false,
                "last_comm": "2018-09-07T07:32:37.961Z",
                "next_comm": "2018-09-07T07:32:37.961Z",
                "system": "TCNG",
                "accesskey": uuid_string,
                "account_id": 500541,
                "devicetype_id": 200017,
                "controlboard_id": null,
                "timezone": "America/New_York"
            }

            ses.patch("ibofanga/device/" + newDeviceId, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceUpdate);
                if (dataItem.ibofangaDeviceUpdate == 200) {
                    expect(resp.body.data.message).to.be.equal("Device successfully updated");
                }

                done();
            });
        });

        it("Delete a device", function(done) {
            console.log("Delete device with id: " + newDeviceId);

            ses.delete("ibofanga/device/" + newDeviceId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaDeviceDelete);
                if (dataItem.ibofangaDeviceDelete == 200) {
                    expect(resp.body.data.message).to.be.equal("Device successfully deleted");
                }

                done();
            });
        });

    });
});
