'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var SeatsBookedEndPointCtrlStub = {
  index: 'SeatsBookedEndPointCtrl.index',
  show: 'SeatsBookedEndPointCtrl.show',
  create: 'SeatsBookedEndPointCtrl.create',
  update: 'SeatsBookedEndPointCtrl.update',
  destroy: 'SeatsBookedEndPointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var SeatsBookedEndPointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './SeatsBookedEndPoint.controller': SeatsBookedEndPointCtrlStub
});

describe('SeatsBookedEndPoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(SeatsBookedEndPointIndex).to.equal(routerStub);
  });

  describe('GET /api/SeatsBookedEndPoints', function() {

    it('should route to SeatsBookedEndPoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'SeatsBookedEndPointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/SeatsBookedEndPoints/:id', function() {

    it('should route to SeatsBookedEndPoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'SeatsBookedEndPointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/SeatsBookedEndPoints', function() {

    it('should route to SeatsBookedEndPoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'SeatsBookedEndPointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/SeatsBookedEndPoints/:id', function() {

    it('should route to SeatsBookedEndPoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'SeatsBookedEndPointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/SeatsBookedEndPoints/:id', function() {

    it('should route to SeatsBookedEndPoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'SeatsBookedEndPointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/SeatsBookedEndPoints/:id', function() {

    it('should route to SeatsBookedEndPoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'SeatsBookedEndPointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
