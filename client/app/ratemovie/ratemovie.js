'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ratemovie', {
        template: '<ratemovie></ratemovie>',
        authenticate:'true'
      });
  });
