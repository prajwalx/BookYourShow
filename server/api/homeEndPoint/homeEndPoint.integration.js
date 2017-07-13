'use strict';

var app = require('../..');
import request from 'supertest';

var newHomeEndPoint;

describe('HomeEndPoint API:', function() {

  describe('GET /api/homeEndPoints', function() {
    var homeEndPoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/homeEndPoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          homeEndPoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(homeEndPoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/homeEndPoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/homeEndPoints')
        .send({
          name: 'New HomeEndPoint',
          info: 'This is the brand new homeEndPoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHomeEndPoint = res.body;
          done();
        });
    });

    it('should respond with the newly created homeEndPoint', function() {
      expect(newHomeEndPoint.name).to.equal('New HomeEndPoint');
      expect(newHomeEndPoint.info).to.equal('This is the brand new homeEndPoint!!!');
    });

  });

  describe('GET /api/homeEndPoints/:id', function() {
    var homeEndPoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/homeEndPoints/' + newHomeEndPoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          homeEndPoint = res.body;
          done();
        });
    });

    afterEach(function() {
      homeEndPoint = {};
    });

    it('should respond with the requested homeEndPoint', function() {
      expect(homeEndPoint.name).to.equal('New HomeEndPoint');
      expect(homeEndPoint.info).to.equal('This is the brand new homeEndPoint!!!');
    });

  });

  describe('PUT /api/homeEndPoints/:id', function() {
    var updatedHomeEndPoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/homeEndPoints/' + newHomeEndPoint._id)
        .send({
          name: 'Updated HomeEndPoint',
          info: 'This is the updated homeEndPoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHomeEndPoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHomeEndPoint = {};
    });

    it('should respond with the updated homeEndPoint', function() {
      expect(updatedHomeEndPoint.name).to.equal('Updated HomeEndPoint');
      expect(updatedHomeEndPoint.info).to.equal('This is the updated homeEndPoint!!!');
    });

  });

  describe('DELETE /api/homeEndPoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/homeEndPoints/' + newHomeEndPoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when homeEndPoint does not exist', function(done) {
      request(app)
        .delete('/api/homeEndPoints/' + newHomeEndPoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
