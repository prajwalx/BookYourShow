'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mapmovie', {
        template: '<mapmovie></mapmovie>',
        authenticate:'admin'
      });
  });
