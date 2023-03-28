require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('Account - Name Space', function () {
        var account_id, account,
            user, reset_line,
            role_id, guestUserId;
        var userEmailAddress = process.env.TEST_USER,
            accountId = parseInt(process.env.DEVELOPER_ACCOUNT_ID),
            guestUserEmailId = process.env.GUEST_USER_EMAIL_ID;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        /*before(function (done) {    
            ses.get('user')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                user = res.body.data[0];
                account_id = res.body.data[0].account_id;

                done();
            }); 
            
        });*/

        it("Search users in account", function(done) {
            var queryString = "?per_page=10&page_no=1&user_login=" + encodeURIComponent(userEmailAddress);
            ses.get("account/search-users" + queryString).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.accountUserSearchStatus);
                if (dataItem.accountUserSearchStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].account_id).to.be.equal(accountId);
                    expect(resp.body.data[0].account).to.be.an('object');
                    expect(resp.body.data[0].account.id).to.be.equal(accountId);
                }

                done();
            });
        });

        it("Search a user from another account", function(done) {
            var queryString = "?per_page=5&page_no=1&user_login=" + encodeURIComponent(guestUserEmailId);
            ses.get("account/search-users" + queryString).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.accountUserSearchStatus);
                if (dataItem.accountUserSearchStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].account).to.be.an('object');

                    guestUserId = resp.body.data[0].id;
                }

                done();
            });
        });

        it('should NOT get a list of accounts', function(done){
            ses.get('account')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            }); 
        });

        it('should get a single account', function(done){
            ses.get('account/' + accountId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.accountReadStatus);
                if (dataItem.accountReadStatus == 200) {
                    expect(res.body.data.properties).to.be.an('array');
                    expect(res.body.data.tags).to.be.an('array');
                    expect(res.body.data.type).to.be.an('object');
                    account = res.body.data;
                }

                done();
            }); 
        });

        it('should update an account', function(done){
            console.log("Updating account: " + account.name + " - " + accountId);

            data = {
                "name": account.name,
                "devicify_key": account.name,
                "devicify_synced": account.name,
                "firstuser_defined": account.firstuser_defined,
                "usergroup_id": account.name,
                "ismetric": (account.ismetric == "MPH") ? false : true,
                "ismigrated": account.ismigrated,
                "isactive": account.isactive,
                "salesforce_id": account.salesforce_id,
                "legacy_id": account.legacy_id,
                "thingworx_id": account.thingworx_id,
                "allowed_failed_login_attempts": account.allowed_failed_login_attempts,
                "lockout_reset_mins": account.lockout_reset_mins,
                "address": {
                    "city": account.address.city,
                    "line1": account.address.line1,
                    "line2": account.address.line2,
                    "line3": account.address.line3,
                    "state_province": account.address.state_province,
                    "zip_postcode": account.address.zip_postcode,
                    "country": account.address.country
                },
                "password": {
                    "minlength": account.password.minlength,
                    "mixedcase": account.password.mixedcase,
                    "numbers": account.password.numbers,
                    "symbols": account.password.symbols
                },
                "accounttype_id": account.type.id,
                "tags": account.tags,
                "latitude": account.latitude,
                "longitude": account.longitude,
                // "properties": account.properties,
                "accesskey": account.accesskey,
                "subscription": {
                    "part_number": "1580296186325",
                    "expirationts": "Invalid date"
                }
            };

            ses.patch('account/' + accountId, data).end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.accountUpdateStatus);
                if (dataItem.accountUpdateStatus == 200) {
                    expect(res.body.data.message).to.be.equal("Account successfully updated");
                }

                done();
            }); 
        });

        it('should invite a guest User', function(done){

            data = {
                user_id: guestUserId,
                role_id: 17000005,
                home_url: ses._home
            };
            ses.post('account/invite-user', data)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.inviteGuestUserStatus);
                if(dataItem.inviteGuestUserStatus == 200) {
                    expect(res.body.data.message).to.be.equal("User added to the your account as guest. Welcome email sent.");
                }

                done();
            }); 
        });

        it('should get guest Users', function(done){
            ses.get('account/guest-users')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.guestUserReadStatus);
                if(dataItem.guestUserReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                }

                done();
            }); 
        });

        it('should be able to switch accounts', function(done) {
            ses.post('account/change-account/' + accountId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.switchAccountStatus);
                if (dataItem.switchAccountStatus == 200) {
                    expect(resp.body.data.token).to.be.a("string");
                }

                done();
            });
        });

        it('should remove a guest User', function(done){
            ses.delete('account/guest-user/' + guestUserId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.guestUserDeleteStatus);
                if (dataItem.guestUserDeleteStatus == 200) {
                    expect(res.body.data.message).to.be.equal("Guest User successfully deleted");
                }

                done();
            }); 
        });

    });
});
