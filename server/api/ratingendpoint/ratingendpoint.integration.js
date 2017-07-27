'use strict';

var app = require('../..');
import request from 'supertest';

var newRatingendpoint;

describe('Ratingendpoint API:', function() {

  describe('GET /api/ratingendpoints', function() {
    var ratingendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratingendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ratingendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/ratingendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ratingendpoints')
        .send({
          name: 'New Ratingendpoint',
          info: 'This is the brand new ratingendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRatingendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created ratingendpoint', function() {
      expect(newRatingendpoint.name).to.equal('New Ratingendpoint');
      expect(newRatingendpoint.info).to.equal('This is the brand new ratingendpoint!!!');
    });

  });

  describe('GET /api/ratingendpoints/:id', function() {
    var ratingendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratingendpoints/' + newRatingendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      ratingendpoint = {};
    });

    it('should respond with the requested ratingendpoint', function() {
      expect(ratingendpoint.name).to.equal('New Ratingendpoint');
      expect(ratingendpoint.info).to.equal('This is the brand new ratingendpoint!!!');
    });

  });

  describe('PUT /api/ratingendpoints/:id', function() {
    var updatedRatingendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/ratingendpoints/' + newRatingendpoint._id)
        .send({
          name: 'Updated Ratingendpoint',
          info: 'This is the updated ratingendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRatingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRatingendpoint = {};
    });

    it('should respond with the updated ratingendpoint', function() {
      expect(updatedRatingendpoint.name).to.equal('Updated Ratingendpoint');
      expect(updatedRatingendpoint.info).to.equal('This is the updated ratingendpoint!!!');
    });

  });

  describe('DELETE /api/ratingendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ratingendpoints/' + newRatingendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ratingendpoint does not exist', function(done) {
      request(app)
        .delete('/api/ratingendpoints/' + newRatingendpoint._id)
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
