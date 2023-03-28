require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'),
    u = require('./utils');


var utils = new u();

var userEmailAddress = process.env.IBOFANGA_USER_ID,
    firstName = process.env.IBOFANGA_USER_FIRST_NAME,
    lastName = process.env.IBOFANGA_USER_LAST_NAME,
    accountId = process.env.IBOFANGA_ACCOUNT_ID;
var newUserId;


var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('User - Name Space', function () {
        var user, user_id;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{
                console.log("Logging in as " + dataItem.username);
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                self_uesr_id = utils.parseJwt(ses._token).id;
                done();
            });
        });

        // https://dev-api.trafficloud.io/v1/user?per_page=15&page_no=1&filter_by_user_login=kful&sort_by_column=firstname&sort_dir=1
        it('should search for users by username', function(done){
            // data= {
            //     user_login: ses._user,
            //     home_url: ses._home
            // };
            //console.log(data);
            // ses.get('user?per_page=15&page_no=1&sort_by_column=firstname&sort_dir=1&filter_by_user_login=' + ses._user)
            console.log("Searching the users by username");
            ses.get('account/search-users?user_login=' + encodeURIComponent(ses._user))
            .end((err, res) =>{
                expect(res.statusCode).to.be.equal(dataItem.accountUserSearch);
                done();
            });
        });

        // router.get('/',instance.getAllUsers)
        it('should get a list of users', function(done){
            console.log("Getting the list of users");
            ses.get('user')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.userReadStatus);
                if(dataItem.userReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                    user_id = res.body.data[0].id;
                    user = res.body.data[0];
                }
                done();
            }); 
        });

        it('should get a user by id', function(done){
            console.log("Getting a user details by user id");
            ses.get('user/' + user_id)
            .end((err, res) => {

                expect(res.statusCode).to.be.equal(dataItem.userReadStatus);
                if (dataItem.userReadStatus == 200) {
                    expect(res.body.data).to.be.an('object');
                    user = res.body.data;
                    expect(user).to.be.an('object').that.is.not.empty;
                    expect(user.phone).to.be.an('array');
                    expect(user.certificate).to.be.an('array');
                    expect(user.account).to.be.an('object');
                    expect(user.role).to.be.an('array').that.is.not.empty;
                }

                done();
            });
        });

        // router.post('/',instance.createUser)
        it('should create a user', function(done) {
            // Make sure the id with the user you are creating is not present in the db
            console.log("Creating a new user");
            var data = {
                "firstname": firstName,
                "lastname": lastName,
                "title": "Mr",
                "user_login": userEmailAddress,
                "account_id": accountId,
                "role_id": 17000005,
                "phone": [],
                "smsenabled": true,
                "thingworx_id": utils.getRandomInt(1500000000000, 1600000000000).toString(),
                "active": true,
                "home_url": "https://dev-portal.trafficloud.io",
                "accesskey": "",
                "registration_complete": false
            };

            ses.post("user", data).end((err, resp) => {
                /**
                 * If the statusCode is 400, check if the env.IBOFANGA_USER_ID is already exists in DB
                 * Otherwise check the data JSON
                 */
                expect(resp.statusCode).to.be.equal(dataItem.userCreateStatus);

                if(dataItem.userCreateStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully created. Welcome mail sent.");
                    expect(resp.body.data.id).to.be.a('number');
                    newUserId = resp.body.data.id;
                    console.log("Created a new user with id: " + newUserId);
                } else {
                    console.log("No permission to create user!")
                }

                done();
            });
        });

        // router.patch('/:id',instance.patchAccount.bind(instance))
        it('should update a user by id', function(done) {
            console.log("Updating the user with id: " + newUserId);
            var data = {
                "firstname": firstName,
                "lastname": lastName + "Edited",
                "title": "Mr",
                "user_login": userEmailAddress,
                "account_id": accountId,
                "role_id": 17000005,
                "phone": [],
                "smsenabled": true,
                "thingworx_id": utils.getRandomInt(1500000000000, 1600000000000).toString(),
                "active": true,
                "home_url": "https://dev-portal.trafficloud.io",
                "accesskey": null
            };
            ses.patch('user/' + newUserId, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.userEditStatus);
                if (dataItem.userEditStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully updated");
                }

                done();
            });
        });

        // Do this one Different since we need to send without a token
        it('should reset a password', function(done){
            console.log("Resetting password for a user");
            ses.api.post('user/reset-password')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    home_url: ses._home,
                    user_login: "testfuncuser@alltrafficsolutions.com"
                })
                .expect('Content-Type', /json/)
                .end(function (err, res){
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.data.message.substring(0, 8)).to.be.equal('Password');
                    done();
                });
        });

        // router.patch('/change-password/:id',instance.patchCredentials.bind(instance))
        it('should change a password', function(done) {
            console.log("Changing the password");
            var data = {
                "password": process.env.TEST_PASSWORD,
                "password_new": process.env.TEST_PASSWORD
            };

            ses.patch("user/change-password/" + self_uesr_id, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(200);
                expect(resp.body.data.message).to.be.equal("Password changed successfully");

                done();
            });
        });

        it('should delete a user', function(done) {
            console.log('Delete the user with id:' + newUserId);
            ses.delete("user/" + newUserId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.userDeleteStatus);
                if (dataItem.userDeleteStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("User successfully deleted");
                } else {
                    console.log("No permission to delete user!")
                }

                done();
            });
        });

        // router.get('/certficate/:id',instance.getCertDetails)
        xit('should get user certificates');

        // router.put('/certficate/:id',instance.updateUserCert)
        xit('should put certificates');

        // router.get(/v1/phonecontext)
        xit('get user PhoneContext');

    });

});