'use strict';

describe('Component: MapmovieComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var MapmovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MapmovieComponent = $componentController('mapmovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
