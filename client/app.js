'use strict';

angular.module('eveTools', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'mgcrea.ngStrap'
])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('industry', {
                url: '/',
                templateUrl: 'views/industry.view.html',
                controller: 'IndustryController'
            })
        .state('demo', {
            url: '/demo',
            templateUrl: 'views/demo.view.html',
            controller: 'DemoController'
        })
    });