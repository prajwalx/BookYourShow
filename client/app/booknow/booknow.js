'use strict';

angular.module('yoManprojectfolderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booknow', {
        template: '<booknow></booknow>'
      });
  });
