'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatre', {
        template: '<theatre></theatre>'
      });
  });
