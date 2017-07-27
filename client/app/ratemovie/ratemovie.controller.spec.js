'use strict';

describe('Component: RatemovieComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var RatemovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    RatemovieComponent = $componentController('ratemovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
