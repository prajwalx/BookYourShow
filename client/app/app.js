'use strict';

angular.module('yoManprojectfolderApp', ['yoManprojectfolderApp.auth',
    'yoManprojectfolderApp.admin', 'yoManprojectfolderApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match','chart.js','jtt_youtube','ngAnimate'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
