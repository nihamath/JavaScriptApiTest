/**
 * Script for ibofanga APIs
 */

require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session');

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('Ibofanga Account API Testing', function() {
        
        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        var account_list;
        // var account_id;
        var account_id = 503041;
        var account_name = "TEST_ACCOUNT_FOR_SCRIPT_3";
        var script_user_id = process.env.TEST_USER_ID;

        it("Get All Accounts List", function(done) {
            console.log("Getting all accounts");
            ses.get('ibofanga/account').end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountRead);
                if (dataItem.ibofangaAccountRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
            
                    account_list = resp.body.data;
                }
        
                done();
            });
        });

        // This test case can be enabled when the delete account API exception is resloved
        // Now the delete account API throws 500 Server Exception
        // Also backend validation for duplicate account name also should be implemented
        xit("Create a new Account", function(done) {
            console.log("Creating a new account");

            data = {
                "name": account_name,
                "devicify_key": account_name,
                "devicify_synced": account_name,
                "firstuser_defined": false,
                "usergroup_id": account_name,
                "ismetric": false,
                "ismigrated": true,
                "isactive": "true",
                "salesforce_id": "",
                "legacy_id": "",
                "thingworx_id": "",
                "address": {
                "city": "Harrisburg",
                "line1": "ATS Office",
                "line2": "Street Address",
                "line3": "",
                "state_province": "Pennsylvania",
                "zip_postcode": "17025",
                "country": "USA"
                },
                "password": {
                "minlength": 8,
                "mixedcase": true,
                "numbers": true,
                "symbols": true
                },
                "accounttype_id": "15000000",
                "latitude": 40.2956458,
                "longitude": -76.9700669,
                "properties": []
            }

            ses.post('ibofanga/account', data).end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountCreate);
                if (dataItem.ibofangaAccountCreate == 200) {
                    expect(resp.body.data.message).to.be.equal("Account successfully created");

                    account_id = resp.body.data.id;
                }

                done();
            });
        });

        it("Fetch an account by name", function(done) {
            console.log("Get an account with name: " + account_name);

            data = {
                name: account_name
            }
            ses.get("ibofanga/account/fetch" + "?name=" + account_name).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountRead);
                if (dataItem.ibofangaAccountRead == 200) {
                    expect(resp.body.data.rows).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data.rows[0].name).to.be.equal(account_name);
                }

                done();
            });

        });

        it("Get an account by ID", function(done) {
            console.log("Get an account with id: " + account_id);

            ses.get("ibofanga/account/" + account_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountRead);
                if (dataItem.ibofangaAccountRead == 200) {
                    expect(resp.body.data.id).to.be.equal(account_id);
                    expect(resp.body.data.name).to.be.equal(account_name);
                }
                done();
            });
        });

        it("Update an Account with specific ID", function(done) {
            console.log("Updating the account with id: " + account_id);
            data = {
                "name": account_name,
                "devicify_key": account_name,
                "devicify_synced": account_name,
                "firstuser_defined": false,
                "usergroup_id": account_name,
                "ismetric": false,
                "ismigrated": true,
                "isactive": true,
                "salesforce_id": "",
                "legacy_id": "",
                "thingworx_id": "",
                "address": {
                "city": "Harrisburg",
                "line1": "ATS Office",
                "line2": "Street Address",
                "line3": "",
                "state_province": "Pennsylvania",
                "zip_postcode": "17025",
                "country": "USA"
                },
                "password": {
                "minlength": 8,
                "mixedcase": true,
                "numbers": true,
                "symbols": true
                },
                "accounttype_id": "15000000",
                "latitude": 40.2956458,
                "longitude": -76.9700669,
                "properties": []
            }

            ses.patch("ibofanga/account/" + account_id, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountUpdate);
                if (dataItem.ibofangaAccountUpdate == 200) {
                    expect(resp.body.data.message).to.be.equal("Account successfully updated");
                }
                done();
            });
        });

        it("Invite a guest user to the account", function(done) {
            console.log("Inviting a guest user with id: " + script_user_id);
            data = {
                "user_id": script_user_id,
                "role_id": "17000000",
                "home_url": "https://dev-portal.trafficloud.io",
                "hidden": ""
            }
            ses.post("ibofanga/account/" + account_id + "/invite-user", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaGuestUserInvite);
                if (dataItem.ibofangaGuestUserInvite == 200) {
                    expect(resp.body.data.message).to.be.equal("User added to the your account as guest. Welcome email sent.");
                }

                done();
            });
        });

        if (dataItem.ibofangaGuestUserInvite == 200) {
            it("Invite an existing guest user to the account", function(done) {
                console.log("Inviting an existing guest user with id: " + script_user_id);
                data = {
                    "user_id": script_user_id,
                    "role_id": "17000000",
                    "home_url": "https://dev-portal.trafficloud.io",
                    "hidden": ""
                }
                ses.post("ibofanga/account/" + account_id + "/invite-user", data).end((err, resp) => {
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.statusText).to.be.equal("The user is already a member of the same account!");

                    done();
                });
            });
        }

        it("Get the Guest Users from an account", function(done) {
            console.log("Get the list of guest users for the account with id: ", account_id);

            ses.get("ibofanga/account/" + account_id + "/guest-users").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaGuestUserRead);
                if (dataItem.ibofangaGuestUserRead == 200) {
                    expect(resp.body.data).to.be.an('array');
                }

                done();
            });
        });

        it("Delete a guest user from the account", function(done) {
            console.log("Deleting the guest user with id: " + script_user_id);

            ses.delete("ibofanga/account/" + account_id + "/guest-user/" + script_user_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaGuestUserDelete);
                if (dataItem.ibofangaGuestUserDelete == 200) {
                    expect(resp.body.data.message).to.be.equal("Guest User successfully deleted");
                }

                done();
            });
        });

        it("Get users from an account", function(done) {
            console.log("Get the list of users in the account with account id: " + account_id);

            ses.get("ibofanga/" + account_id + "/user").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaAccountUsersRead);
                if (dataItem.ibofangaAccountUsersRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].account_id).to.be.equal(account_id);
                }

                done();
            });
        });

        xit("Delete an account", function(done) {
            console.log("Delete an account with id: " + account_id);

            ses.delete("ibofanga/account/" + account_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);

                done();
            });
        });

    });
});