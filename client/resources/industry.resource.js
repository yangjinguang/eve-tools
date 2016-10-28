angular.module('eveTools')
    .factory('IndustryResource', function ($resource) {
        var serverUrl = 'http://localhost:6543/industry';
        this.plan = $resource(serverUrl + '/plan/:id');
        return this;
    });