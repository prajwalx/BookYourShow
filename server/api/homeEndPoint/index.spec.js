'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var homeEndPointCtrlStub = {
  index: 'homeEndPointCtrl.index',
  show: 'homeEndPointCtrl.show',
  create: 'homeEndPointCtrl.create',
  update: 'homeEndPointCtrl.update',
  destroy: 'homeEndPointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var homeEndPointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './homeEndPoint.controller': homeEndPointCtrlStub
});

describe('HomeEndPoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(homeEndPointIndex).to.equal(routerStub);
  });

  describe('GET /api/homeEndPoints', function() {

    it('should route to homeEndPoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'homeEndPointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/homeEndPoints/:id', function() {

    it('should route to homeEndPoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'homeEndPointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/homeEndPoints', function() {

    it('should route to homeEndPoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'homeEndPointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/homeEndPoints/:id', function() {

    it('should route to homeEndPoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'homeEndPointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/homeEndPoints/:id', function() {

    it('should route to homeEndPoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'homeEndPointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/homeEndPoints/:id', function() {

    it('should route to homeEndPoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'homeEndPointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
