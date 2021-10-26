const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const Comment = require('../models/comment.js');
const { expect } = chai;
chai.use(chaiHttp);

describe('Unit Integration: Comments tests', () => {

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


         
         it('should return a comment created', (done) => {

            chai.request(app)
                .post('/comment/568620')
                .set('Content-Type', 'application/json')
                .send({ description: 'This is a comment',
                author: 'Juan' })
                .end(function(err, res){

                    if (err) done(err)

                    expect(res).to.have.status(201);
                    done()

                });
        })
    })
})


describe('Unit Test: Comments tests', () => {

    describe('create a comment', () => {

        //Aqui comienza el test.
        it('should return a comment created', async () => {

            let data = {
                body: 'This is a comment',
                author: 'Juan',
                movie_id: 568620
            }
            
            const comment = await Comment.createWithValidation(data);

            expect(comment).to.be.an('object');
        })


        it('should return when body is empty', async () => {

            let data = {
                body: '',
                author: 'Juan',
                movie_id: 568620
            }
            
            const comment = await Comment.createWithValidation(data);

            expect(comment).to.be.an('string');
            expect(comment).to.equal('Bad request');
            
            
        })

        it('should return when author is empty', async () => {

            let data = {
                body: 'This is a comment',
                author: '',
                movie_id: 568620
            }
            
            const comment = await Comment.createWithValidation(data);

            expect(comment).to.be.an('string');
            expect(comment).to.equal('Bad request');
            
            
        })
    })
})