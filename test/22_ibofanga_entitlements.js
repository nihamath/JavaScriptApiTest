/**
 * Scripts for Ibofanga - Entitlements APIs
 */

require('dotenv-safe').config();

var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 
    u = require('./utils');

var utils = new u();
var accountId = process.env.IBOFANGA_ACCOUNT_ID;

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {

    describe("Ibofanga - Scripts for Entitlements APIs", function() {

        var entitlementsList, devicesList, modulesList, newModuleId;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get all entitlements", function(done) {
            console.log("Getting all the entitlements");

            ses.get("ibofanga/entitlements").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementRead);
                if(dataItem.ibofangaEntitlementRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;

                    entitlementsList = resp.body.data;
                }

                done();
            });
        });

        it("Get Devices by Account ID", function(done) {
            console.log("Getting all the devices related to the account with id: " + accountId);

            ses.get("ibofanga/devices/" + accountId + "?page_no=1&per_page=10").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountDeviceRead);
                if (dataItem.ibofangaAccountDeviceRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;

                    devicesList = resp.body.data;
                }

                done();
            });
        });

        it("Get the entitlement modules by account id", function(done) {
            console.log("Get the entitlement modules by Account Id: " + accountId);

            ses.get("ibofanga/entitlement-modules/" + accountId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementRead);
                if (dataItem.ibofangaEntitlementRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;

                    modulesList = resp.body.data;
                }

                done();
            });
        });

        it("Get device entitlements by device id", function(done){
            var deviceId = devicesList ? devicesList[0].id: 702440;
            console.log("Get device entitlements by device id: " + deviceId);

            ses.get("ibofanga/device-entitlements/" + deviceId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementRead);
                if (dataItem.ibofangaEntitlementRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].device_id).to.be.equal(deviceId);
                }

                done();
            });
        });

        it("Get module entitlements by module id", function(done){
            var moduleId = modulesList ? modulesList[0].id: 1100019;
            console.log("Get module entitlements by module id: " + moduleId);

            ses.get("ibofanga/module-entitlements/" + moduleId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementRead);
                if (dataItem.ibofangaEntitlementRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].module_id).to.be.equal(moduleId);
                }

                done();
            });
        });

        it("Get entitlement packages by account id", function(done) {
            console.log("Get entitlement packages by account id: " + accountId);

            ses.get("ibofanga/entitlement-packages/" + accountId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementRead);
                if (dataItem.ibofangaEntitlementRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].id).to.be.a('number');
                }

                done();
            });
        });

        it("Create entitlement module", function(done) {
            console.log("Create entitlement module with name: \"Trafficloud1\"");

            var data = {
                name: "Trafficloud1",
                account_id: accountId
            };
            ses.post("ibofanga/entitlement-modules", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaModuleAdd);
                if (dataItem.ibofangaModuleAdd == 200) {
                    expect(resp.body.data.id).to.be.a('number');

                    newModuleId = resp.body.data.id;
                }
                done();
            });
        });

        if (dataItem.ibofangaModuleAdd == 200) {
            xit("Should not create entitlement module not in available option", function(done) {
                console.log("Create entitlement module with name: \"RandomString\"");

                var data = {
                    name: "RandomString",
                    account_id: accountId
                };
                ses.post("ibofanga/entitlement-modules", data).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.statusText).to.be.a('Validation error: Validation isIn on name failed');

                    done();
                });
            });
        }

        it("Delete an entitlement module", function(done) {
            if (!newModuleId) {
                newModuleId = 1100019;
            }
            console.log("Deleting an entitlement module with id: " + newModuleId);

            ses.delete("ibofanga/entitlement-modules/" + newModuleId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaModuleDelete);
                if (dataItem.ibofangaModuleDelete == 200) {
                    expect(resp.body.data.message).to.be.equal("Module successfully deleted");
                }

                done();
            });
        });

        it("Create Entitlement Package", function(done) {
            console.log("Creating a new entitlement package");

            var moduleId = modulesList ? modulesList[0].id : modulesList;
            var entitlementId = entitlementsList ? entitlementsList[0].id: entitlementsList;
            var dt = new Date();

            var data = {
                "account_id": accountId,
                "start_date":utils.getDateInISOFormat(dt),
                "end_date":utils.addYears(dt, 1, true),
                "modules":[
                    {
                        "module_id":moduleId,
                        "entitle_id":entitlementId,
                        "entitle_name":"Streetline Access",
                        "name":"Parking"
                    }
                ],
                "devices":[]
            };

            ses.post("ibofanga/entitlement-package", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaEntitlementAdd);
                if (dataItem.ibofangaEntitlementAdd == 200) {
                    expect(resp.body.data.message).to.be.equal("New entitlement package created successfully");
                }

                done();
            });

        });
    });
});
