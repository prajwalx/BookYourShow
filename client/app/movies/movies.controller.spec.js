'use strict';

describe('Component: MoviesComponent', function () {

  // load the controller's module
  beforeEach(module('yoManprojectfolderApp'));

  var MoviesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MoviesComponent = $componentController('movies', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
