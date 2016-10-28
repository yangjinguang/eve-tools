angular.module('eveTools')
    .factory('MarketResource', function ($resource) {
        var serverUrl = 'http://localhost:6543';
        return $resource(serverUrl + '/price/:id', {}, {})
    });