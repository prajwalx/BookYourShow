'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theatresendpointCtrlStub = {
  index: 'theatresendpointCtrl.index',
  show: 'theatresendpointCtrl.show',
  create: 'theatresendpointCtrl.create',
  update: 'theatresendpointCtrl.update',
  destroy: 'theatresendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theatresendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theatresendpoint.controller': theatresendpointCtrlStub
});

describe('Theatresendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(theatresendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/theatresendpoints', function() {

    it('should route to theatresendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theatresendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theatresendpoints/:id', function() {

    it('should route to theatresendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theatresendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theatresendpoints', function() {

    it('should route to theatresendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theatresendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theatresendpoints/:id', function() {

    it('should route to theatresendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theatresendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theatresendpoints/:id', function() {

    it('should route to theatresendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theatresendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theatresendpoints/:id', function() {

    it('should route to theatresendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theatresendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
