'use strict';

describe('Component: EditmoviemappingComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var EditmoviemappingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    EditmoviemappingComponent = $componentController('editmoviemapping', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
