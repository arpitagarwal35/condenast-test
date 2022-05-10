var expect = require('chai').expect;
var request = require('request');

describe('News page', function () {
    it('status', function (done) {
        request('http://localhost:3000/', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('search status', function (done) {
        request('http://localhost:3000?q=covid', function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});