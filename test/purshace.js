let chai = require('chai');
const expect = chai.expect;
const app = require('../server');
//chai-http used to send async requests to our app
const http = require('chai-http');
chai.use(http);

// import User and purshace model
const purshace = require('../models/Purchase');
const Book = require('../models/Book');
const User = require('../models/User');

// describe('purshace basic tests', () => {
//     it('Should exists', () => {
//     expect(app).to.be.a('function');
//   });
// });

describe('Add a purshace', async () => {
   //mock find the first book id
    try{
          let books = await Book.find();
        }
          catch(err){

        } 
  it('/api/purshace should return 200 if everything is correct', done => {
   
    
    //mock login to get token
    const valid_input = {
      email: 'abdal1123@gmail.com',
      password: 'P@ssw0rd123'
    };
    //send login request to the app to receive token
    chai
      .request(app)
      .post('/api/users/login')
      .send(valid_input)
      .then(login_response => {
        //add token to next request Authorization headers as adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = login_response.body.token;
        
          const purshace_detail={
          bookId:  Book[0]._id
        }
        chai
          .request(app)
          .post('/api/purchases')
          .set('x-auth-token', token)
          .send(purshace_detail)
          .then(purshace_response => {
            //assertions
            expect(purshace_response).to.have.status(200);

            done();
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  it('/api/purshace should return 401 if for invalid purshace details', done => {
    //mock login to get token
    const valid_input = {
      email: 'abdal1123@gmail.com',
      password: 'P@ssw0rd123'
    };
    //send login request to the app to receive token
    chai
      .request(app)
      .post('/api/users/login')
      .send(valid_input)
      .then(login_response => {
        //add token to next request Authorization headers as adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = login_response.body.token;
        const purshace_detail = {
        bookId:  ""

          };
        chai
          .request(app)
          .post('/api/purshace')
          .set('x-auth-token', token)
          .send(purshace_detail)
          .then(purshace_response => {
            //assertions
            expect(purshace_response).to.have.status(401);

            done();
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  after(done => {
    //stop app server
    done();
  });
});

describe('Delete a Purchace', () => {
  before(done => {
    Book.find()
      .deleteMany()
      .then(res => {
        console.log('Purchace removed');
        done();
      })
      .catch(err => {
        console.log(err.message);
      });
  });
  it('/api/purchaseId should return 200 if purchase is deleted', done => {
    //mock login to get token
    const valid_input = {
      email: 'abdal1123@gmail.com',
      password: 'P@ssw0rd123'
    };
    //send login request to the app to receive token
    chai
      .request(app)
      .post('/api/users/login')
      .send(valid_input)
      .then(login_response => {
        //add token to next request Authorization headers as adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = login_response.body.token;
        const purchaseId  = req.params.purchaseId ;

        chai
          .request(app)
          .post('/api/purchaseId')
          .set('x-auth-token', token)
          .send(purchaseId)
          .then(Purchace_response => {
            chai
              .request(app)
              .delete(`/api/purchaseId/${purchaseId}`)
              .set('x-auth-token', token)
              .then(res => {
                expect(res).to.have.status(200);
                done();
              });
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  after(done => {
    //stop app server
    console.log('All tests completed, stopping server....');
    process.exit();
    done();
  });
});
