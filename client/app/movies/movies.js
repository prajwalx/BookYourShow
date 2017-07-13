'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>',
        controller:'AdminController',
        controllerAs:'admin',
        authenticate:'admin'
      });
  });
