'use strict';

describe('Component: TheatreComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var TheatreComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheatreComponent = $componentController('theatre', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
