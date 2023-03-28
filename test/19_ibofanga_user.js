require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var newUser = null;

function getRandomThingworxId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {

    describe("Ibofanga User API Testing", function() {

        var userEmailAddress = process.env.IBOFANGA_USER_ID,
            firstName = process.env.IBOFANGA_USER_FIRST_NAME,
            lastName = process.env.IBOFANGA_USER_LAST_NAME,
            accountId = process.env.IBOFANGA_ACCOUNT_ID,
            accountName = process.env.IBOFANGA_ACCOUNT_NAME,
            filterFirstName = process.env.FILTER_USER_FIRST_NAME,
            filterLastName = process.env.FILTER_USER_LAST_NAME;
        var newUserId = process.env.TEST_USER_ID;
        
        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) => {
                console.log(dataItem.username)
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it("Get all the users", function(done) {
            console.log("Getting all the users");
            ses.get('ibofanga/user').end((err, resp ) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                }
                done();
            });
        });

        it("Add user", function(done) {
            console.log("Adding a user using the ibofanga API");
            data = {
                "firstname": firstName,
                "lastname": lastName,
                "title": "Mr",
                "user_login": userEmailAddress,
                "account_id": accountId,
                "role_id": 17000005,
                "phone": [],
                "smsenabled": true,
                "thingworx_id": getRandomThingworxId(1500000000000, 1600000000000).toString(),
                "active": true,
                "home_url": "https://dev-portal.trafficloud.io",
                "accesskey": "",
                "registration_complete": false
            }
            ses.post("ibofanga/user", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaUserCreateStatus);
                if (dataItem.ibofangaUserCreateStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully created. Welcome mail sent.");
                    expect(resp.body.data.id).to.be.a('number');

                    newUserId = resp.body.data.id;
                }

                done();
            });
        });

        if (dataItem.ibofangaUserCreateStatus == 200) {
            it("Should not add user with an existing email address", function(done) {
                console.log("Adding a user with existing email address");
                data = {
                    "firstname": firstName,
                    "lastname": lastName,
                    "title": "Mr",
                    "user_login": userEmailAddress,
                    "account_id": accountId,
                    "role_id": 17000005,
                    "phone": [],
                    "smsenabled": true,
                    "thingworx_id": getRandomThingworxId(1500000000000, 1600000000000).toString(),
                    "active": true,
                    "home_url": "https://dev-portal.trafficloud.io",
                    "accesskey": "",
                    "registration_complete": false
                }
                ses.post("ibofanga/user", data).end((err, resp) => {
                    var message = "The provided user login \"" + userEmailAddress + "\" already exists."
                    expect(resp.statusCode).to.be.equal(400);
                    expect(resp.body.statusText).to.be.equal(message);

                    done();
                });
            })
        }

        it("Fetch User by Id", function(done) {
            console.log("Fetch the details of the user with Id: " + newUserId);

            ses.get("ibofanga/user/" + newUserId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data.user_login).to.be.equal(userEmailAddress);
                    newUser = resp.body.data;
                }

                done();
            });
        })

        it("Search User with user login", function(done) {
            console.log("Search the user with user login: " + userEmailAddress);

            ses.get("ibofanga/search-users?user_login=" + encodeURIComponent(userEmailAddress)).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].id).to.be.equal(newUserId);
                    expect(resp.body.data[0].user_login).to.be.equal(userEmailAddress);
                }

                done();
            });
        });

        it("Update User using Ibofanga Api", function(done) {
            console.log("Update the user with Id: " + newUserId);

            data = {
                "firstname": newUser.firstname,
                "lastname": newUser.lastname,
                "title": "Mr",
                "user_login": newUser.user_login,
                "account_id": newUser.account.id,
                "role_id": newUser.role[0].id,
                "phone": [],
                "smsenabled": true,
                "thingworx_id": "1581327364283",
                "active": true,
                "home_url": "https://dev-portal.trafficloud.io",
                "accesskey": null
            };

            ses.patch("ibofanga/user/" + newUserId, data).end((err, resp) => {
                console.log(dataItem.ibofangaUserEditStatus);
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaUserEditStatus);
                if (dataItem.ibofangaUserEditStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully updated");
                }
                done();
            });
        });

        it("Search User with first name", function(done) {
            console.log("Search the user with user first name: " + filterFirstName);

            ses.get("ibofanga/search-users?firstname=" + encodeURIComponent(filterFirstName)).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].firstname).contain(filterFirstName);
                }

                done();
            });
        });

        it("Search User with last name", function(done) {
            console.log("Search the user with user last name: " + filterLastName);

            ses.get("ibofanga/search-users?lastname=" + encodeURIComponent(filterLastName)).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].lastname).contains(filterLastName);
                }

                done();
            });
        });

        it("Search users with account name", function(done) {
            console.log("Search the users with account name: " + accountName);

            ses.get("ibofanga/search-users?account_name=" + encodeURIComponent(accountName)).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].account.name).to.be.equal(accountName);
                }

                done();
            });
        });

        it("Delete a user using Ibofanga API", function(done) {
            console.log("Delete the user with Id:" + newUserId);

            ses.delete("ibofanga/user/" + newUserId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibofangaUserDeleteStatus);
                if (dataItem.ibofangaUserDeleteStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully deleted");
                }

                done();
            });
        });

        it("Get the users from an account", function(done) {
            console.log("Fetching all the users for the account");

            ses.get("ibofanga/" + accountId + "/user").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.ibonfangaUserReadStatus);
                if (dataItem.ibonfangaUserReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].account_id.toString()).to.be.equal(accountId);
                }

                done();
            });
        });

    });
});
