'use strict';

var app = require('../..');
import request from 'supertest';

var newMapmovieEndpoint;

describe('MapmovieEndpoint API:', function() {

  describe('GET /api/mapmovieEndpoints', function() {
    var mapmovieEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapmovieEndpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapmovieEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mapmovieEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/mapmovieEndpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mapmovieEndpoints')
        .send({
          name: 'New MapmovieEndpoint',
          info: 'This is the brand new mapmovieEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMapmovieEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created mapmovieEndpoint', function() {
      expect(newMapmovieEndpoint.name).to.equal('New MapmovieEndpoint');
      expect(newMapmovieEndpoint.info).to.equal('This is the brand new mapmovieEndpoint!!!');
    });

  });

  describe('GET /api/mapmovieEndpoints/:id', function() {
    var mapmovieEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapmovieEndpoints/' + newMapmovieEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapmovieEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      mapmovieEndpoint = {};
    });

    it('should respond with the requested mapmovieEndpoint', function() {
      expect(mapmovieEndpoint.name).to.equal('New MapmovieEndpoint');
      expect(mapmovieEndpoint.info).to.equal('This is the brand new mapmovieEndpoint!!!');
    });

  });

  describe('PUT /api/mapmovieEndpoints/:id', function() {
    var updatedMapmovieEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/mapmovieEndpoints/' + newMapmovieEndpoint._id)
        .send({
          name: 'Updated MapmovieEndpoint',
          info: 'This is the updated mapmovieEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMapmovieEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMapmovieEndpoint = {};
    });

    it('should respond with the updated mapmovieEndpoint', function() {
      expect(updatedMapmovieEndpoint.name).to.equal('Updated MapmovieEndpoint');
      expect(updatedMapmovieEndpoint.info).to.equal('This is the updated mapmovieEndpoint!!!');
    });

  });

  describe('DELETE /api/mapmovieEndpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mapmovieEndpoints/' + newMapmovieEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mapmovieEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/mapmovieEndpoints/' + newMapmovieEndpoint._id)
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
