var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 

var userPermission = require('./user_permissions');
var userPerm = new userPermission();
var userData = userPerm.getUserPermissions();
var subStructure = null;

userData.forEach(function (dataItem) {
    describe('Structures', function () {
        var struct_list;
        var struct, orig_struct, struct_id;
        var orig = {total_spaces: 0, occupied: 0};
        var newvalues = {total_spaces: 0, occupied: 0};

        before(function (done) {
            console.log("Running the script as user: " + dataItem.username);
            ses = new s(dataItem.username, dataItem.password);
            ses.login()
            .end((err, res) =>{            
                expect(res.statusCode).to.be.equal(200);
                ses._token =  "JWT " + res.body.data.token;
                done();
            });
        });

        it('should Get a list of structures', function(done){
            ses.get('structure')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data).to.be.an('array').that.is.not.empty;
                    struct_list = res.body.data;
                }
                
                done();
            }); 
        });

        it('should Get details of structure', function(done){
            ses.get('structure/' + struct_list[struct_list.length - 1].id)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    struct = res.body.data; 
                    orig.total_spaces= parseInt(struct.total_spaces || 100);
                    orig.occupied= parseInt(struct.occupied || 5);
                }
                done();
            });
        });
        
        if (dataItem.structureReadStatus == 200) {
            it('should Not Get another accounts structure', function(done){
                foo = parseInt(struct.id) + 1000;
                ses.get('structure/' + foo)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200); 
                    expect(res.body.data).to.be.null;
                    done();
                });
            });
        }

        it('Get all non-hidden parent structures', function(done) {
            console.log("Get all parent structures for the account");
            ses.get("structure/parents?hide_hidden=true").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].hidden).to.be.equal(false);
                    // @TODO: Following line has to be enabled once the meta count mismatch is fixed
                    // expect(resp.body.meta.count).to.be.equal(resp.body.data.length);
                }

                done();
            });
        });

        it("Get all parent structures", function(done) {
            console.log("Get all parent structures including hidden");
            ses.get("structure/parents").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    // @TODO: Following line has to be enabled once the meta count mismatch is fixed
                    // expect(resp.body.meta.count).to.be.equal(resp.body.data.length);
                }

                done();
            });
        });

        var uniquename = null;
        var remove_id = null;
        var fullThres = 10, lowThres = 100, medThres = 500, occupied = 10, totalSpace = 1000;

        it('should add a structure', function(done){
            uniquename = ses.guid()
            data = {
                "name": uniquename,
                "color": "green",
                "account_id": 500541, // All Traffic Solutions Software Developer Account
                "elevation": 40.795491766546505,
                "structuretype_id": 12500000,
                "geofence": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-77.86031765045368,40.79528059817542],[-77.85962564052784,40.794777016562996],[-77.85908383430683,40.79434653247892],[-77.85730284752094,40.79559736529706],[-77.85859030784809,40.79663700061409],[-77.86031765045368,40.79528059817542]]]},\"properties\":{}}]}",
                "latitude": 40.795491766546505,
                "longitude": -77.85881024898731,
                "devices": [],
                "calc_avail": true,
                "hidden": false,
                "abbreviation": "DS1",
                "note": " ",
                "address": "E Calder Way, State College, PA 16801, USA",
                "total_spaces": 1000,
                "description": "Dev Struct 1",
                "avail_full_thres": fullThres,
                "avail_low_thres": lowThres,
                "avail_med_thres": medThres,
                "occupied": occupied
            };

            ses.post('structure', data)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureAddStatus);
                if (dataItem.structureAddStatus == 200) {
                    expect(res.body.data.message).to.be.equal("Structure successfully created");
                    expect(res.body.data.id).to.be.a('number');
                    remove_id = res.body.data.id;
                }

                done();
            });
        });

        it("Create a child structure", function(done) {
            console.log("Creating a child structure for the parent structure just created");

            remove_id = remove_id ? remove_id : struct.id;

            data = {
                "name": uniquename + " - SubLevel1",
                "color": "green",
                "account_id": 500541, // All Traffic Solutions Software Developer Account
                "elevation": 40.795491766546505,
                "structuretype_id": 12500000,
                "geofence": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-77.86031765045368,40.79528059817542],[-77.85962564052784,40.794777016562996],[-77.85908383430683,40.79434653247892],[-77.85730284752094,40.79559736529706],[-77.85859030784809,40.79663700061409],[-77.86031765045368,40.79528059817542]]]},\"properties\":{}}]}",
                "latitude": 40.795491766546505,
                "longitude": -77.85881024898731,
                "devices": [],
                "calc_avail": true,
                "hidden": false,
                "abbreviation": "DS1",
                "note": " ",
                "address": "E Calder Way, State College, PA 16801, USA",
                "total_spaces": 1000,
                "description": "Dev Struct 1",
                "avail_full_thres": fullThres,
                "avail_low_thres": lowThres,
                "avail_med_thres": medThres,
                "occupied": occupied,
                "parent_id": remove_id
            };

            ses.post('structure', data).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureAddStatus);
                if (dataItem.structureAddStatus == 200) {
                    expect(resp.body.data.message).to.be.equal("Structure successfully created");
                    expect(resp.body.data.id).to.be.a('number');
                    subStructure = resp.body.data;
                }

                done();
            });
        });

        it("Get the child structures of a parent", function(done) {
            console.log("Getting all the child structures of a parent structure");
            ses.get("structure/" + remove_id + "/children").end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    if (dataItem.structureAdjustStatus == 200) {
                        expect(resp.body.data[0].id).to.be.equal(subStructure.id);
                    }
                }

                done();
            });
        });

        it('should update a structure', function(done){
            data = {
                "name": "THISISABRANDNEWNAME",
                "color": "green",
                "account_id": 500541, // All Traffic Solutions Software Developer Account
                "elevation": 40.795492,
                "structuretype_id": 12500000,
                "geofence": "{\"type\":\"FeatureCollection\",\"features\":[{\"type\":\"Feature\",\"geometry\":{\"type\":\"Polygon\",\"coordinates\":[[[-77.86031765045368,40.79528059817542],[-77.85962564052784,40.794777016562996],[-77.85908383430683,40.79434653247892],[-77.85730284752094,40.79559736529706],[-77.85859030784809,40.79663700061409],[-77.86031765045368,40.79528059817542]]]},\"properties\":{}}]}",
                "latitude": 40.795492,
                "longitude": -77.85881,
                "devices": [],
                "calc_avail": true,
                "hidden": dataItem.structureDeleteStatus == 200 ? false : true,
                "abbreviation": "DS1",
                "note": " ",
                "address": "E Calder Way, State College, PA 16801, USA",
                "total_spaces": 1000,
                "status": "open",
                "description": "Dev Struct 1",
                "avail_full_thres": fullThres,
                "avail_low_thres": lowThres,
                "avail_med_thres": medThres,
                "occupied": occupied,
                "tz_offset": -4,
                "pcnt_full": 1,
                "children": subStructure ? [{"id": subStructure.id, "name": subStructure.name}] : [],
                "adjustments": []
            };
            ses.patch('structure/' + remove_id, data)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureEditStatus);
                if (dataItem.structureEditStatus == 200) {
                    expect(res.body.data.message).to.be.equal("Structure successfully updated");
                }
                done();
            });

        });

        it('should Confirm Update worked new structures', function(done){
            var testid = null;
            ses.get('structure')
            .expect(function(response){
                var slist = response.body.data;
                slist.forEach((s) =>{
                    if(s.name == "THISISABRANDNEWNAME"){
                        testid = s.id;
                    }
                });   
            })      
            .end((err, res)=> {
                expect(testid).to.not.be.null;
                done();
            });
        });

    // ------------------------------------------------------------------------

        it("Get structure occupancy by ID", function(done) {
            console.log("Getting occupancy for structure with id: " + remove_id);
            ses.get("structure/occupancy/" + remove_id).end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(resp.body.data.id).to.be.equal(remove_id);
                    if (dataItem.structureAddStatus == 200) {
                        expect(resp.body.data.occupied).to.be.equal(occupied);
                        expect(resp.body.data.unoccupied).to.be.equal(totalSpace - occupied);
                    }

                    orig.total_spaces= parseInt(resp.body.data.total_spaces || 100);
                    orig.occupied= parseInt(resp.body.data.occupied || 5);
                }

                done();
            });
        });

        it('should allow structure adustment', function(done){
            console.log("Adjusting occuppancy for structure with id: " + remove_id);
            newvalues.total_spaces = parseInt(orig.total_spaces) + 1;
            newvalues.occupied= parseInt(orig.occupied) + 1;

            console.log(newvalues);
            ses.patch('structure/adjust/' + remove_id, newvalues)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureAdjustStatus);
                done();
            });
        });

        if (dataItem.structureAdjustStatus == 200) {
            it('can confirm adustment', function(done){
                ses.get('structure/adjust/' + remove_id)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(dataItem.structureReadStatus);
                    if (dataItem.structureReadStatus == 200) {
                        expect(res.body.data.current.occupied).to.be.equal(newvalues.occupied);
                        expect(res.body.data.current.occupied).to.not.be.equal(orig.occupied);
                        expect(res.body.data.current.total_spaces).to.be.equal(newvalues.total_spaces);
                        expect(res.body.data.current.total_spaces).to.not.be.equal(orig.total_spaces);
                    }
                    done();
                });
            });

            it('can reset to original values', function(done){
                ses.patch('structure/adjust/' + remove_id, orig)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(dataItem.structureAdjustStatus);
                    done();
                });
            });

            it('should allow adustment to occupied only', function(done){
                newvalues.total_spaces = orig.total_spaces + 1;
                newvalues.occupied= orig.occupied + 5;
                data = {occupied: newvalues.occupied };
                ses.patch('structure/adjust/' + remove_id, data)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(dataItem.structureAdjustStatus);
                    done();
                });
            });

            it('confirm single adustment', function(done){
                ses.get('structure/adjust/' + remove_id)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(dataItem.structureReadStatus);
                    if (dataItem.structureReadStatus == 200) {
                        expect(res.body.data.current.occupied).to.be.equal(newvalues.occupied);
                        expect(res.body.data.current.occupied).to.not.be.equal(orig.occupied);
                        expect(res.body.data.current.total_spaces).to.be.equal(orig.total_spaces);
                    }
                    done();
                });
            });
        }

        it('should Remove new structures', function(done){
            ses.delete('structure/' + remove_id)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(dataItem.structureDeleteStatus);
                done();
            });
        });

        it('Get all structure types', function(done) {
            console.log("Get the list of all structure types");
            ses.get('structuretype').end((err, resp) => {
                expect(resp.statusCode).to.be.equal(dataItem.structureReadStatus);
                if (dataItem.structureReadStatus == 200) {
                    expect(resp.body.data).to.be.an('array').that.is.not.empty;
                    expect(resp.body.data[0].id).to.be.a('number');
                }

                done();
            });
        });

    });
});
