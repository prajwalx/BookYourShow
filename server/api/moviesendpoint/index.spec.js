'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviesendpointCtrlStub = {
  index: 'moviesendpointCtrl.index',
  show: 'moviesendpointCtrl.show',
  create: 'moviesendpointCtrl.create',
  update: 'moviesendpointCtrl.update',
  destroy: 'moviesendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviesendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviesendpoint.controller': moviesendpointCtrlStub
});

describe('Moviesendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviesendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/moviesendpoints', function() {

    it('should route to moviesendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviesendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviesendpoints/:id', function() {

    it('should route to moviesendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviesendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviesendpoints', function() {

    it('should route to moviesendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviesendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviesendpoints/:id', function() {

    it('should route to moviesendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviesendpoints/:id', function() {

    it('should route to moviesendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviesendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviesendpoints/:id', function() {

    it('should route to moviesendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviesendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
