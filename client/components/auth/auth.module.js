'use strict';

angular.module('yoManprojectfolderApp.auth', ['yoManprojectfolderApp.constants',
    'yoManprojectfolderApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
