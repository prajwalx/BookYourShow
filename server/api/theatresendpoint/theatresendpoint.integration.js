'use strict';

var app = require('../..');
import request from 'supertest';

var newTheatresendpoint;

describe('Theatresendpoint API:', function() {

  describe('GET /api/theatresendpoints', function() {
    var theatresendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatresendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatresendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theatresendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theatresendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theatresendpoints')
        .send({
          name: 'New Theatresendpoint',
          info: 'This is the brand new theatresendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheatresendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created theatresendpoint', function() {
      expect(newTheatresendpoint.name).to.equal('New Theatresendpoint');
      expect(newTheatresendpoint.info).to.equal('This is the brand new theatresendpoint!!!');
    });

  });

  describe('GET /api/theatresendpoints/:id', function() {
    var theatresendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatresendpoints/' + newTheatresendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatresendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      theatresendpoint = {};
    });

    it('should respond with the requested theatresendpoint', function() {
      expect(theatresendpoint.name).to.equal('New Theatresendpoint');
      expect(theatresendpoint.info).to.equal('This is the brand new theatresendpoint!!!');
    });

  });

  describe('PUT /api/theatresendpoints/:id', function() {
    var updatedTheatresendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/theatresendpoints/' + newTheatresendpoint._id)
        .send({
          name: 'Updated Theatresendpoint',
          info: 'This is the updated theatresendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheatresendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheatresendpoint = {};
    });

    it('should respond with the updated theatresendpoint', function() {
      expect(updatedTheatresendpoint.name).to.equal('Updated Theatresendpoint');
      expect(updatedTheatresendpoint.info).to.equal('This is the updated theatresendpoint!!!');
    });

  });

  describe('DELETE /api/theatresendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theatresendpoints/' + newTheatresendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theatresendpoint does not exist', function(done) {
      request(app)
        .delete('/api/theatresendpoints/' + newTheatresendpoint._id)
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
