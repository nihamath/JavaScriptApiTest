var should = require('chai').should(),
    expect = require('chai').expect,

    Session = require('./session');
    // ses = new Session();

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();


userData.forEach(function (dataItem) {
    describe('Sites', function () {
        var site_list;
        var site;
        // var site_id;
        // var orig = {total_spaces: 0, occupied: 0};
        // var newvalues = {total_spaces: 0, occupied: 0};

        before(function (done) {
            console.log("Running script as user: " + dataItem.username);
            ses = new Session(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
            // done();
        });

        it('Should get a list of Sites', function(done){
            ses.get('site')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.siteReadStatus);
                if (dataItem.siteReadStatus == 200) {
                    expect(res.body.data).to.be.an('array').that.is.not.empty;;
                    site_list = res.body.data;
                }
                done();
            }); 
        });

        it('Should get Site Details', function(done){
            ses.get('site/' + site_list[0].id)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.siteReadStatus);
                if (dataItem.siteReadStatus == 200) {
                    expect(res.body.data).to.be.an('object');
                    // console.log(res.body.data);
                    site = res.body.data;
                }
                done();
            });
        });

        it('should add a Site', function(done) {
            console.log("Creating a new Site.");
            
            var data = {
                "name": "Site from Script",
                "description": "site from Script",
                "hidden": false,
                "speed_limit": 50,
                "address": "State College,US,PA,16801,3100,Research Dr",
                "latitude": 40.76386180000001,
                "elevation": 387.6716613769531,
                "thingworx_id": "",
                "longitude": -77.87803919999999,
                "ignore_gps": false,
                "carddirection_id": "666000",
                "bidirectional": true,
                "account_id": 500541
            }
            ses.post("site", data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.siteAddStatus);
                if (dataItem.siteAddStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("Site successfully created");
                    expect(resp.body.data.id).to.be.a('number');

                    site_id = resp.body.data.id;
                }
                done();
            });
        });

        it('should update a Site', function(done) {
            console.log("Updating site with id: " + site_id);

            var data = {
                "name": "Site from Script - Updated",
                "description": "Site from Script - Updated",
                "hidden": false,
                "speed_limit": 40,
                "address": "State College,US,PA,16801,3100,Research Dr",
                "latitude": 40.76386180000001,
                "elevation": 387.6716613769531,
                "thingworx_id": "1538131410429",
                "longitude": -77.87803919999999,
                "ignore_gps": false,
                "carddirection_id": 666000,
                "bidirectional": true,
                "account_id": 500541
            }
            ses.patch("site/" + site_id, data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.siteEditStatus);
                if (dataItem.siteEditStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("Site successfully updated");
                }

                done();
            });
        });

        it('should Not Get another accounts Site', function(done){
            // console.log(struct_list.id, struct.id);
            foo = parseInt(site.id) + 1000;
            // console.log(foo);
            ses.get('site/' + foo)
            .end((err, res) => {
                // console.log(res.body)
                expect(res.statusCode).to.be.equal(dataItem.siteReadStatus); 
                expect(res.body.data).to.be.null;
                done();
            });
        });

        it("Get all cardinal directions", function(done) {
            console.log("Get all cardinal directions");

            ses.get("cardinaldirection").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.siteReadStatus);
                if (dataItem.siteReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                }

                done();
            });
        });

        it("Get id and names of all sites", function(done) {
            console.log("Calling concise api");

            ses.get("site/concise").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.siteReadStatus);
                if (dataItem.siteReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].id).to.be.a('number');
                }

                done();
            });
        });
    });
});
