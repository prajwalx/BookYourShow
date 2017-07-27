'use strict';

describe('Component: ConfirmationComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var ConfirmationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ConfirmationComponent = $componentController('confirmation', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
