angular.module('eveTools')
    .factory('ItemsResource', function ($resource) {
        var serverUrl = 'http://localhost:6543/items';
        return $resource(serverUrl + '/:id', {}, {
            getMinerals: {
                method: 'GET',
                url: serverUrl + '/minerals'
            },
            getByPath: {
                method: 'GET',
                url: serverUrl + '/getByPath'
            },
            getTypes: {
                method: 'GET',
                url: serverUrl + '/getTypes'
            }
        })
    });