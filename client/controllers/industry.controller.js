"use strict";

angular.module('eveTools')
    .controller('IndustryController', function ($scope, $modal, ItemsResource, MarketResource) {
        var data = $scope.data = {};
        data.items = [
            {
                id: 0,
                name: '乌鸦级海军型',
                materials: [
                    {
                        typeId: 17637,
                        name: '乌鸦级海军型蓝图',
                        number: 1,
                        // price: 1535000000
                    },
                    {
                        typeId: 35,
                        name: '类晶体胶矿',
                        number: 2652667,
                        // price: 5.23
                    },
                    {
                        typeId: 37,
                        name: '同位聚合体',
                        number: 165911,
                        // price: 81
                    },
                    {
                        typeId: 34,
                        name: '三钛合金',
                        number: 10608667,
                        // price: 2
                    },
                    {
                        typeId: 36,
                        name: '类银超金属',
                        number: 664444,
                        // price: 32
                    },
                    {
                        typeId: 39,
                        name: '晶状石英核岩',
                        number: 19755,
                        // price: 2048
                    },
                    {
                        typeId: 38,
                        name: '超新星诺克石',
                        number: 41422,
                        // price: 512
                    },
                    {
                        typeId: 40,
                        name: '超噬矿',
                        number: 6288,
                        // price: 8000
                    }

                ]
            }
        ];
        function getPrice(mtl, cb) {
            MarketResource.get({id: mtl.typeId}, function (res) {
                mtl.price = res.data;
            })
        }

        ItemsResource.getMinerals({}, function (res) {
            console.log(res);
            data.minerals = res.data;
        }, function (err) {
            console.log(err)
        });
        data.thisItem = data.items[0];
        angular.forEach(data.thisItem.materials, function (mtl) {
            getPrice(mtl)
        });

        var fn = $scope.fn = {
            mtlSum: function () {
                var res = 0;
                angular.forEach(data.thisItem.materials, function (i) {
                    var price = 0;
                    try {
                        price = i.price.sell.min;
                    } catch (err) {

                    }
                    res += Number(price) * Number(i.number);
                });
                return res;
            },
            delMtl: function (index) {
                data.thisItem.materials.splice(index, 1);
            },
            addMtl: function () {
                var modal = $modal({
                    title: '添加材料',
                    templateUrl: 'views/industry.mtlAdd.tpl.html',
                    show: true
                });
                var scope = modal.$scope;
                scope.materials = data.minerals;
                scope.mtlTypes = [
                    {
                        name: '蓝图',
                        key: 'blueprint'
                    },
                    {
                        name: '矿物',
                        key: 'minerals'
                    }
                ];


                scope.modalData = {};
                scope.modalData.minerals = data.minerals;
                scope.modalData.blueprint = [
                    {
                        typeId: 17637,
                        name: '乌鸦级海军型蓝图',
                        number: 1,
                        price: 1535000000
                    }
                ];

                scope.modalData.mtlType = 'minerals';
                scope.save = function () {
                    console.log(scope.modalData.newMtl);
                    data.thisItem.materials.push(scope.modalData.newMtl);
                    scope.$hide()
                };
                scope.test = function () {
                    console.log(scope.modalData.mtlType)
                }
            }
        }
    });