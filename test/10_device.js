require('dotenv-safe').config();
var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 
ses = new s();
var api = ses.api;    

describe('Device', function () {
    var device_list, deviceTypeList;
    var device;
    var deviceStruct;
    var testUserId = process.env.TEST_USER_ID;

    before(function (done) {
        ses.login()
        .end((err, res) =>{            
            expect(res.statusCode).to.be.equal(200);
            ses._token =  "JWT " + res.body.data.token;
            done();
        });
    });


    it('Should get a Device List', function(done){
        ses.get('device?system=TCNG')
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.data).to.be.an('array');
            // console.log(res.body);
            expect(res.body.data).to.be.an('array').that.is.not.empty;
            device_list = res.body.data;
            done();
        }); 
    });

    it('Should get Device Details', function(done){
        ses.get('device/' + device_list[0].id)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);   
            expect(res.body.data).to.be.an('object');
            // console.log(res.body.data);
            device = res.body.data; 
            done();
        });
    });

    
    it('should Not Get another accounts structure', function(done){
        // console.log(struct_list.id, struct.id);
        foo = parseInt(device.id) + 100;
        // console.log(foo);
        ses.get('device/' + foo)
        .end((err, res) => {
            // console.log(res.body)
            expect(res.statusCode).to.be.equal(200); 
            expect(res.body.data).to.be.null;
            done();
        });
    });

    it('Should update Device Details', function(done){
        // api.get('structure/details?id=' + struct_list.id)
        // orig_device = device;
        // struct_list.occupied = parseInt(struct_list.occupied) + 1;
        data = {
            id: device.id,
            account_id: device.account_id,
            is_stolen: device.is_stolen,
            jsettings: device.jsettings,
            last_comm: device.last_comm,
            next_comm: device.next_comm,
            nickname: device.nickname,
            salesforce_id: device.salesforce_id,
            serialnumber: device.serialnumber,
            smartapps_id: device.smartapps_id,
            status: device.status,
            tz_offset: device.tz_offset
        };
        ses.patch('device/' + device.id, data)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);   
            // console.log(res.body.data);
            // struct = res.body.data; 
            done();
        });
    });

    it("Updating the device structure", function(done) {
        console.log("Updating the device structures");
        var data = {
            "data": [{
                "defaultaction": "read",
                "idx_int": 1,
                "structure_id": 12305191,
                "jsettings": null
            }]
        };
        ses.post("device/" + device.id + "/structures", data).end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data.message).to.be.equal("Structure association successfully updated");

            done();
        });
    });

    it('Should get device structures', function(done) {
        console.log("Getting device structures");
        ses.get("device/" + device.id + "/structures").end((err, resp) => {

            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data).to.be.an("array").that.is.not.empty;
            expect(resp.body.data[0].device_id).to.be.equal(device.id);

            deviceStruct = resp.body.data[0].structure;

            done();
        });
    });

    it("Perform device action", function(done) {
        console.log("Perform device actions");
        var functionType = "laser_counter_classifier";
        var data = {
            "message_type": "debugMode",
            "message": "{}",
            "auser_id": testUserId
        };

        ses.post("device/" + device.id + "/action/" + functionType, data).end((err, resp) => {
            expect(resp.statusCode).to.be.equal(200);
            expect(resp.body.data.message).to.be.equal("Action has been queued");

            done();
        });
    });
});
