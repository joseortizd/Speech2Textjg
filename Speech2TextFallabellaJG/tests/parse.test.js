const request = require('supertest')
const app = require('../app')
let { data } = require('./objects/RequestObject');

describe('POST /v1/parse', function () {
    it('respond with 200 Ok', function (done) {
        request(app)
            .post('/v1/parse')
            .send(data)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }, 15000);
});

describe('POST /v1/parse', function () {
    let data = [{
        'data': 'no data'
    }];
    it('respond with 400 Bad Request', function (done) {
        request(app)
            .post('/v1/parse')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    }, 0);
});