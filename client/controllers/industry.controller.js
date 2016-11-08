"use strict";

angular.module('eveTools')
    .controller('IndustryController', function ($scope, $modal, $timeout, ItemsResource, MarketResource, IndustryResource) {
        var data = $scope.data = {};

        function getPrice(mtl, cb) {
            MarketResource.get({id: mtl.typeId}, function (res) {
                mtl.price = res.data;
            })
        }

        function getPlanDetail(plan) {
            IndustryResource.plan.get({id: plan.id}, function (res) {
                data.thisPlan = res.data;
                console.log(data.thisPlan);
                angular.forEach(data.thisPlan.materials, function (mtl) {
                    getPrice(mtl)
                });
            })
        }

        function isInList(item, list) {
            var res = -1;
            angular.forEach(list, function (i, index) {
                if (i.typeId == item.typeId) {
                    res = index
                }
            });
            return res;
        }

        IndustryResource.plan.get(function (res) {
            data.plans = res.data;
            getPlanDetail(data.plans[0])
        });

        var fn = $scope.fn = {
            mtlSum: function () {
                if (angular.isUndefined(data.thisPlan)) {
                    return;
                }
                var res = 0;
                angular.forEach(data.thisPlan.materials, function (i) {
                    var price = 0;
                    try {
                        price = i.price.sell.min;
                    } catch (err) {

                    }
                    res += Number(price) * Number(i.number);
                });
                return res;
            },
            planNameEdit: function (event) {
                if (data.planNameEdit) {
                    return;
                }
                data.planNameEdit = true;
                $timeout(function () {
                    // angular.element('#ddddd')[0].focus();
                    angular.element(event.currentTarget).find('input')[0].focus()
                })
            },
            planChange: function (plan) {
                getPlanDetail(plan)
            },
            newPlan: function () {
                data.thisPlan = {
                    name: '新建方案',
                    materials: []
                }
            },
            updatePlan: function (plan) {

            },
            savePlan: function (plan) {

            },
            materialAdd: function (item) {
                if (isInList(item, data.thisPlan.materials) < 0) {
                    item.number = 1;
                    getPrice(item);
                    data.thisPlan.materials.push(item)
                }
            },
            delMtl: function (index) {
                data.thisPlan.materials.splice(index, 1);
            },
            // addMtl: function () {
            //     var modal = $modal({
            //         title: '添加材料',
            //         templateUrl: 'views/industry.mtlAdd.tpl.html',
            //         show: true
            //     });
            //     var scope = modal.$scope;
            //     scope.materials = data.minerals;
            //     scope.mtlTypes = [
            //         {
            //             name: '蓝图',
            //             key: 'blueprint'
            //         },
            //         {
            //             name: '矿物',
            //             key: 'minerals'
            //         }
            //     ];
            //
            //
            //     scope.modalData = {};
            //     scope.modalData.minerals = data.minerals;
            //     scope.modalData.blueprint = [
            //         {
            //             typeId: 17637,
            //             name: '乌鸦级海军型蓝图',
            //             number: 1,
            //             price: 1535000000
            //         }
            //     ];
            //
            //     scope.modalData.mtlType = 'minerals';
            //     scope.save = function () {
            //         console.log(scope.modalData.newMtl);
            //         data.thisPlan.materials.push(scope.modalData.newMtl);
            //         scope.$hide()
            //     };
            //     scope.test = function () {
            //         console.log(scope.modalData.mtlType)
            //     }
            // }
        }
    });