'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ratingendpointCtrlStub = {
  index: 'ratingendpointCtrl.index',
  show: 'ratingendpointCtrl.show',
  create: 'ratingendpointCtrl.create',
  update: 'ratingendpointCtrl.update',
  destroy: 'ratingendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ratingendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ratingendpoint.controller': ratingendpointCtrlStub
});

describe('Ratingendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(ratingendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/ratingendpoints', function() {

    it('should route to ratingendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ratingendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/ratingendpoints/:id', function() {

    it('should route to ratingendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ratingendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/ratingendpoints', function() {

    it('should route to ratingendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ratingendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/ratingendpoints/:id', function() {

    it('should route to ratingendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ratingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ratingendpoints/:id', function() {

    it('should route to ratingendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ratingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ratingendpoints/:id', function() {

    it('should route to ratingendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ratingendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
