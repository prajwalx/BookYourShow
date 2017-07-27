'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mapmovieEndpointCtrlStub = {
  index: 'mapmovieEndpointCtrl.index',
  show: 'mapmovieEndpointCtrl.show',
  create: 'mapmovieEndpointCtrl.create',
  update: 'mapmovieEndpointCtrl.update',
  destroy: 'mapmovieEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mapmovieEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mapmovieEndpoint.controller': mapmovieEndpointCtrlStub
});

describe('MapmovieEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(mapmovieEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/mapmovieEndpoints', function() {

    it('should route to mapmovieEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mapmovieEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/mapmovieEndpoints/:id', function() {

    it('should route to mapmovieEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mapmovieEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/mapmovieEndpoints', function() {

    it('should route to mapmovieEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mapmovieEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/mapmovieEndpoints/:id', function() {

    it('should route to mapmovieEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mapmovieEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mapmovieEndpoints/:id', function() {

    it('should route to mapmovieEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mapmovieEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mapmovieEndpoints/:id', function() {

    it('should route to mapmovieEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mapmovieEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
