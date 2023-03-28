var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();

userData.forEach(function (dataItem) {
    describe('DeviceType', function () {
        var device_list;
        var device;

        before(function (done) {
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });


        it('Should get a list of DeviceTypes', function(done){
            ses.get('devicetype')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.deviceTypeRead);
                if (dataItem.deviceTypeRead == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;

                    deviceTypeId = res.body.data[res.body.data.length - 1].typeId;
                }

                done();
            }); 
        });

        it("Get device-type details by device-type id", function(done) {
            ses.get("devicetype/" + deviceTypeId).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.deviceTypeDetailsRead);
                if (dataItem.deviceTypeDetailsRead == 200) {
                    expect(resp.body.data).to.be.an('object');
                    expect(resp.body.data.id).to.be.equal(deviceTypeId);
                }

                done();
            });
        });

        it("Get fonts for device-type-id", function(done) {
            ses.get("devicetype/" + deviceTypeId + "/fonts").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.deviceTypeDetailsRead);
                if (dataItem.deviceTypeDetailsRead == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].devicetype_id).to.be.equal(deviceTypeId);
                }

                done();
            });
        });

        after(async () => {  
            ses.clear_token();
        })

    });
});
