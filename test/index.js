const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const { expect } = chai;
chai.use(chaiHttp);

describe('Comments tests', () => {

    describe('create a comment', () => {

        //Aqui comienza el test.
        it('should return a comment created', (done) => {

            chai.request(app)
                .get('/')
                .end(function(err, res){

                    if (err) done(err)

                    expect(res).to.have.status(200);
                    done()

                });
        })
    })
})