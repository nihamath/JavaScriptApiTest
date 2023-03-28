var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api_header = {'Content-Type': 'application/json', 'Accept': 'application/json'},
    api = supertest('https://qa-api.trafficloud.io/v1/'); // TODO: move this to .env pull

describe('----- Run Through Public API -----', function () {  
    var auser = {
        user_login: "functionalTest@alltrafficsolutions.com",
        password: "Fara64+10"
    };
    var token;
    var struct_list;
    before(function (done) {

        api.post('login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            user_login: auser.user_login,
            password: auser.password
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            token =  "JWT " + res.body.data.token;
            done();
        }); 
    });

    it('should refuse bad login', function(done){
        api.post('login')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                user_login: auser.user_login,
                password: 'BoogersAreCool'
            })
            .expect('Content-Type', /json/)
            .end(function (err, res){
                console.log("-- Refuse a Bad Login --");
                console.log(res.body);
                expect(res.statusCode).to.be.equal(400);
                done();
            });
    });

    it('should accept a good login', function(done){
        api.post('login')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                user_login: auser.user_login,
                password: auser.password
            })
            .expect('Content-Type', /json/)
            .end(function (err, res){
                // console.log(res);
                console.log("-- Allow proper Login --");
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.token);
                console.log(res.body);
                done();
            });
    });
    
    //  /v1/structure
    it('Get a list of structures', function(done){
        api.get('structure')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.be.an('array').that.is.not.empty;
            struct_list = res.body.data;
            done();
        }); 
    });

    // //	/v1/structure/details?:id=1&id=2
    it('Get details of structure', function(done){
        console.log('-- Get Structure Details --');
        api.get('structure/details?id=' + struct_list[0].id)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);  
            console.log(res.body.data) 
            // struct = res.body.data[0];         
            done();
        });
    });

    // /v1/report/parking_count
    it('should Get structure entries and exits', function(done){
        console.log('-- Get Parking Entries and Exits --');
        api.post('report/parking_count')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            structure_id: struct_list[0].id
        })
        .end((err, res) => {
            console.log(res.body);
            expect(res.statusCode).to.be.equal(200);      
            done();
        });
        
    });

    // /v1/report/parking_interval  
    it('should Get structure entries and exits with occupancy', function(done){
        console.log('-- Get Parking Interval with Occupancy --');
        api.post('report/parking_interval')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            minutes: 360,
            structure_id: "12300051"
        })
        .end((err, res) => {
            console.log(res.body);
            expect(res.statusCode).to.be.equal(200);
            // res.body.data.timeline.forEach(x => {
            //     console.log(x);
            // });
            done();
        });
    });

});