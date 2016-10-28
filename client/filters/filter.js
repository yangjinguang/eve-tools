angular.module('eveTools')
    .filter('mtlFt', function () {
        return function (list, type) {
            var res = [];
            console.log(type)
            angular.forEach(list, function (item) {
                if (item.type == type) {
                    res.push(item)
                }
            });
            return res;
        }
    });