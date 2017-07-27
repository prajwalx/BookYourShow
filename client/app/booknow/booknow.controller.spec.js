'use strict';

describe('Component: BooknowComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var BooknowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    BooknowComponent = $componentController('booknow', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
