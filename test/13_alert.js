// Scripts for testing Alert APIs
require('dotenv-safe').config();

var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils');

var utils = new u();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();


function getAlertTypes(family, dataItem) {
    var url = "alert/alerttype";
    if (family != null) {
        url = url + "?family=" + family;
    }

    ses.get(url).end((err, resp) => {
        expect(resp.statusCode).to.be.equal(dataItem.alertRead);
        if (dataItem.alertRead == 200) {
            expect(resp.body.data).to.be.an('array').that.is.not.empty;
        }

        return resp.body.data
    });

}

userData.forEach(function (dataItem) {
    describe("Alerts listing and filtering", function() {
        var testUserId = process.env.TEST_USER_ID,
        account_id = process.env.DEVELOPER_ACCOUNT_ID,
        alert_list, alert_type_list, alert_id;
        var device_id = 704857;
        var struct_id = 12300057;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get alert types for parking module", function(done) {
            console.log("Getting the available alert types for parking module");

            getAlertTypes("parking", dataItem);
            done();

        });

        it("Get alert types for traffic module", function(done) {
            console.log("Getting the available alert types for parking module");

            getAlertTypes("traffic", dataItem);
            done();

        });

        it("Get all Alert Types", function(done) {
            console.log("Getting all alert types available");
            /* Requesting URL: https://dev-api.trafficloud.io/v1/alert/alerttype */

            alert_type_list = getAlertTypes(null, dataItem);
            done();

        });

        it("Get the alert list", function(done) {
            console.log("Getting the alerts for the first page");
            data = {
                sort_by_column: "timestamp",
                sort_dir: "DESC"
            };
            /* Requesting URL: https://dev-api.trafficloud.io/v1/alert/?page_no=1&per_page=20&sort_by_column=timestamp&sort_dir=DESC */
            ses.get("alert", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertRead);
                if (dataItem.alertRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    alert_list = resp.body.data;
                }

                done();
            });
        });

        it("Get the details of an alert", function(done) {
            var alert = alert_list[0];
            console.log("Get the details of alert with id: " + alert.id);
            ses.get("alert/" + alert.id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertRead);
                if (dataItem.alertRead == 200) {
                    expect(resp.body.data.id).equal(alert.id);
                    expect(resp.body.data.name).to.be.equal(alert.name);
                    expect(resp.body.data.timestamp).to.be.equal(alert.timestamp);
                }

                done();
            });
        })

        it("Filter alerts with structure", function(done) {
            var alert = alert_list[0];

            console.log("Filter the alerts list with structure id: " + alert.structure_id);

            /* Requesting URL: https://dev-api.trafficloud.io/v1/alert/structure/{structure_id} */
            ses.get("alert/structure/" + alert.structure_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertRead);
                if (dataItem.alertRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    expect(resp.body.data[0].structure_id).to.be.equal(alert.structure_id);
                }

                done();
            });
        });

        it("Filter alerts with device", function(done) {
            /* These lines are commented since most of the alerts miss device_id. 
            Once that's updated, we can remoce the hard-coded device_id and uncomment following lines */
            
            // var alert = alert_list[0];
            // var device_id = alert.device_id;

            console.log("Filter the alerts list with device id: " + device_id);

            /* Requesting URL: https://dev-api.trafficloud.io/v1/alert/device/{device_id} */
            ses.get("alert/device/" + device_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertRead);
                if (dataItem.alertRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    if (resp.body.data.length != 0) {
                        expect(resp.body.data[0].device_id).to.be.equal(device_id);
                    }
                }

                done();
            });
        });

        it("Filter alerts with site", function(done) {
            /* These lines are commented since most of the alerts miss site_id. 
            Once that's updated, we can remove the hard-coded site_id and uncomment following lines */
            
            // var alert = alert_list[0];
            // var site_id = alert.site_id;
            var site_id = "600000";

            console.log("Filter the alerts list with site id: " + site_id);

            /* Requesting URL: https://dev-api.trafficloud.io/v1/alert/site/{site_id} */


            ses.get("alert/site/" +  site_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertRead);
                if (dataItem.alertRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    if (resp.body.data.length != 0) {
                        expect(resp.body.data[0].site_id).to.be.equal(site_id);
                    }
                }

                done();
            });
        });

        /* ALERT SUBSCRIPTION APIs */

        /* STRUCTURE BASED ALERT SUBSCRIPTIONS */

        it("Create structure based alert subscription", function(done) {
            console.log("Creating structure based alert subscriptions");

            var data = {
                "users": [
                    {
                    "id": testUserId,
                    "send_email": true,
                    "send_sms": false
                    }
                ],
                "frequency": 60,
                "threshold": 10,
                "alert_type_id": 360000006,
                "structure_id": struct_id
            };

            ses.post("structure/" + struct_id + "/alert", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionStructureCreate);
                if (dataItem.alertSubscriptionStructureCreate == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert subscription successfully created");
                    // expect(resp.body.data.id).to.be.a("number");

                    // alert_id = resp.body.data.id;
                }

                done();
            });
        });

        // /structure/{id}/alert
        it("Get the alert subscriptions for a structure", function(done) {
            console.log("Getting the alert subscriptions for a structure");
            var structure_id = alert_list[0].structure_id;
            ses.get("structure/" + struct_id + "/alert").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionRead);
                if (dataItem.alertSubscriptionRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    expect(resp.body.data[0].structure_id).to.be.equal(structure_id);

                    alert_id = resp.body.data[resp.body.data.length - 1].id;
                }

                done();
            });
        });

        /* /structure/alert/{alert_id} */
        it("Get the details of a structure based alert subscription", function(done) {
            console.log("Get the details of a structure based alert subscription");

            ses.get("structure/alert/" + alert_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionRead);
                if (dataItem.alertSubscriptionRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    if (resp.body.data.length > 0) {
                        expect(resp.body.data[0].id).to.be.equal(alert_id);
                        expect(resp.body.data[0].auser_id).to.be.equal(parseInt(testUserId));
                    }
                }

                done();
            });
        });

        // /structure/alert/{id}
        it("Update an existing alert subscription", function(done) {
            console.log("Updating an existing structure based alert subscription");

            var data = {
                "users": [
                    {
                    "id": testUserId,
                    "send_email": true,
                    "send_sms": false
                    }
                ],
                "frequency": 60,
                "threshold": 15,
                "alert_type_id": 360000006,
                "structure_id": struct_id
            };

            ses.patch("structure/alert/" + alert_id, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionStructureUpdate);
                if (dataItem.alertSubscriptionStructureUpdate == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert successfully updated");
                }

                done();
            });
        });

        // structure/alert/{id}
        it("Delete an alert subscription", function(done) {
            console.log("Delete an existing structure based alert subscription");

            ses.delete("structure/alert/" + alert_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionStructureDelete);
                if (dataItem.alertSubscriptionStructureDelete == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert successfully deleted");
                }

                done();
            });
        });

        /* DEVICE BASED ALERT SUBSCRIPTIONS */

        /* /device/{id}/alert */
        it("Create alert subscription for a device", function(done) {
            console.log("Create alert subscription for a device");

            var data = {
                "alert_type_id": 360000038,
                "device_id": device_id,
                "frequency": 15,
                "threshold": 10,
                "users": [
                {
                    "id": testUserId,
                    "send_email": false,
                    "send_sms": true
                }
                ]
            };
            ses.post("device/" + device_id + "/alert", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionDeviceCreate);
                if (dataItem.alertSubscriptionDeviceCreate == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert subscription successfully created");
                    if (resp.body.data.length > 0) {
                        expect(resp.body.data.id).to.be.a("number");
                        alert_id = resp.body.data.id;
                    }
                }

                done();
            });
        });

        /* /device/{id}/alert */
        it("Get device based alert subscriptions", function(done) {
            console.log("Getting the alert subscriptions for a device");

            ses.get("device/" + device_id + "/alert").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionRead);
                if (dataItem.alertSubscriptionRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                    expect(resp.body.data[resp.body.data.length - 1].device_id).to.be.equal(device_id);

                    alert_id = resp.body.data[resp.body.data.length - 1].id;
                }

                done();
            });
        });

        it("Update a device based alert subscription", function(done) {
            console.log("Updating device based alert subscription with id: " + alert_id);

            var data = {
                "alert_type_id": 360000038,
                "device_id": device_id,
                "frequency": 15,
                "threshold": 15,
                "users": [
                    {
                        "id": testUserId,
                        "send_email": false,
                        "send_sms": true
                    }
                ]
            };

            ses.patch("device/alert/" + alert_id, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionDeviceUpdate);
                if (dataItem.alertSubscriptionDeviceUpdate == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert subscription successfully updated");
                }

                done();
            });
        });

        it("Delete a device based alert subscription", function(done) {
            console.log("Deleting the device based alert subscription");

            ses.delete("device/alert/" + alert_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.alertSubscriptionDeviceDelete);
                if (dataItem.alertSubscriptionDeviceDelete == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.message).to.be.equal("Alert subscription successfully deleted");
                }

                done();
            });
        });

        /* /alert/user/{id} => Get alert by user ID */
        it("Get alert by user ID");

        /* /alert/alerttype/{alert_type_id} */
        it("Get alerts by alert type id");
    });
});
