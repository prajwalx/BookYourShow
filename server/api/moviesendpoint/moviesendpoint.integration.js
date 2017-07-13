'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviesendpoint;

describe('Moviesendpoint API:', function() {

  describe('GET /api/moviesendpoints', function() {
    var moviesendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviesendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviesendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviesendpoints')
        .send({
          name: 'New Moviesendpoint',
          info: 'This is the brand new moviesendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviesendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created moviesendpoint', function() {
      expect(newMoviesendpoint.name).to.equal('New Moviesendpoint');
      expect(newMoviesendpoint.info).to.equal('This is the brand new moviesendpoint!!!');
    });

  });

  describe('GET /api/moviesendpoints/:id', function() {
    var moviesendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesendpoints/' + newMoviesendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      moviesendpoint = {};
    });

    it('should respond with the requested moviesendpoint', function() {
      expect(moviesendpoint.name).to.equal('New Moviesendpoint');
      expect(moviesendpoint.info).to.equal('This is the brand new moviesendpoint!!!');
    });

  });

  describe('PUT /api/moviesendpoints/:id', function() {
    var updatedMoviesendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviesendpoints/' + newMoviesendpoint._id)
        .send({
          name: 'Updated Moviesendpoint',
          info: 'This is the updated moviesendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviesendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviesendpoint = {};
    });

    it('should respond with the updated moviesendpoint', function() {
      expect(updatedMoviesendpoint.name).to.equal('Updated Moviesendpoint');
      expect(updatedMoviesendpoint.info).to.equal('This is the updated moviesendpoint!!!');
    });

  });

  describe('DELETE /api/moviesendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviesendpoints/' + newMoviesendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviesendpoint does not exist', function(done) {
      request(app)
        .delete('/api/moviesendpoints/' + newMoviesendpoint._id)
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
