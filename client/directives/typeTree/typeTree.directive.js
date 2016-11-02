angular.module('eveTools')
    .directive('typeTree', function (ItemsResource) {
        return {
            restrict: 'E',
            templateUrl: './directives/typeTree/typeTree.tpl.html',
            link: function (scope, element, attr, ctrl) {
                var data = scope.data = {};
                data.typeTree = {
                    name: 'root',
                    path: null,
                    level: 0,
                    children: []
                };

                function getTypes(type) {
                    if (type.childShow) {
                        type.childShow = false;
                        return;
                    }
                    var params = {};
                    if (type.name != 'root') {
                        if (type.path == 'root') {
                            params = {path: type.name}
                        } else {
                            params = {path: type.path + '/' + type.name}
                        }
                        if (type.childrenCount > 0) {
                            ItemsResource.getTypes(params, function (res) {
                                type.children = res.data;
                                angular.forEach(type.children, function (i) {
                                    i.level = type.level + 1
                                });
                                type.childShow = true;
                            })
                        } else {
                            ItemsResource.getByPath(params, function (res) {
                                type.items = res.data;
                                angular.forEach(type.items, function (i) {
                                    i.level = type.level + 1
                                });
                                type.childShow = true;
                            })
                        }
                    } else {
                        ItemsResource.getTypes({}, function (res) {
                            type.children = res.data;
                            angular.forEach(type.children, function (i) {
                                i.level = type.level + 1
                            });
                            type.childShow = true;
                        })
                    }
                }

                getTypes(data.typeTree);
                var fn = scope.fn = {
                    showChild: function (type) {
                        getTypes(type)
                    }
                }
            }
        }
    });