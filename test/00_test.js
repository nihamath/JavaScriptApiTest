var should = require('chai').should(),
    expect = require('chai').expect,
    s = require('./session'); 
ses = new s();

describe('Structures', function () {
    // var struct_list;
    // var struct, orig_struct;
    // var orig = {total_spaces: 0, occupied: 0};
    // var newvalues = {total_spaces: 0, occupied: 0};

    // before(function (done) {
    //     ses.login()
    //     .end((err, res) =>{            
    //         expect(res.statusCode).to.be.equal(200);
    //         ses._token =  "JWT " + res.body.data.token;
    //         done();
    //     });
    // });

    // var remove_id = null;
    // it('should Find new structures', function(done){
    //     ses.get('structure')
    //     .expect(function(response){
    //         var slist = response.body.data;
    //         slist.forEach((s) =>{
    //             // console.log(s);
    //             if(s.name == 'Test 01'){
    //                 remove_id = s.id;
    //             }
    //         });   
    //     })           
    //     .end((err, res)=> {
    //         expect(remove_id).to.not.be.null;
    //         done();
    //     });
    // });

    // it('should Remove new structures', function(done){
    //     ses.delete('structure/' + remove_id)
    //     .end((err, res) => {
    //         console.log(res.body);
    //         expect(res.statusCode).to.be.equal(200);
    //         done();
    //     });
    // });
});
