'use strict';

var app = require('../..');
import request from 'supertest';

var newSeatsBookedEndPoint;

describe('SeatsBookedEndPoint API:', function() {

  describe('GET /api/SeatsBookedEndPoints', function() {
    var SeatsBookedEndPoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/SeatsBookedEndPoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          SeatsBookedEndPoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(SeatsBookedEndPoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/SeatsBookedEndPoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/SeatsBookedEndPoints')
        .send({
          name: 'New SeatsBookedEndPoint',
          info: 'This is the brand new SeatsBookedEndPoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeatsBookedEndPoint = res.body;
          done();
        });
    });

    it('should respond with the newly created SeatsBookedEndPoint', function() {
      expect(newSeatsBookedEndPoint.name).to.equal('New SeatsBookedEndPoint');
      expect(newSeatsBookedEndPoint.info).to.equal('This is the brand new SeatsBookedEndPoint!!!');
    });

  });

  describe('GET /api/SeatsBookedEndPoints/:id', function() {
    var SeatsBookedEndPoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/SeatsBookedEndPoints/' + newSeatsBookedEndPoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          SeatsBookedEndPoint = res.body;
          done();
        });
    });

    afterEach(function() {
      SeatsBookedEndPoint = {};
    });

    it('should respond with the requested SeatsBookedEndPoint', function() {
      expect(SeatsBookedEndPoint.name).to.equal('New SeatsBookedEndPoint');
      expect(SeatsBookedEndPoint.info).to.equal('This is the brand new SeatsBookedEndPoint!!!');
    });

  });

  describe('PUT /api/SeatsBookedEndPoints/:id', function() {
    var updatedSeatsBookedEndPoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/SeatsBookedEndPoints/' + newSeatsBookedEndPoint._id)
        .send({
          name: 'Updated SeatsBookedEndPoint',
          info: 'This is the updated SeatsBookedEndPoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeatsBookedEndPoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeatsBookedEndPoint = {};
    });

    it('should respond with the updated SeatsBookedEndPoint', function() {
      expect(updatedSeatsBookedEndPoint.name).to.equal('Updated SeatsBookedEndPoint');
      expect(updatedSeatsBookedEndPoint.info).to.equal('This is the updated SeatsBookedEndPoint!!!');
    });

  });

  describe('DELETE /api/SeatsBookedEndPoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/SeatsBookedEndPoints/' + newSeatsBookedEndPoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when SeatsBookedEndPoint does not exist', function(done) {
      request(app)
        .delete('/api/SeatsBookedEndPoints/' + newSeatsBookedEndPoint._id)
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
