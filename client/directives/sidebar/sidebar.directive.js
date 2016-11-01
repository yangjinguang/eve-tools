angular.module('eveTools')
    .directive('sidebar', function () {
        "use strict";
        return {
            restrict: 'E',
            templateUrl: './directives/sidebar/sidebar.tpl.html',
            link: function (scope, element, attr, ctrl) {

            }
        }
    });