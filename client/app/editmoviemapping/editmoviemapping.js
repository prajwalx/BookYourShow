'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editmoviemapping', {
        template: '<editmoviemapping></editmoviemapping>',
        authenticate:'admin'
      });
  });
