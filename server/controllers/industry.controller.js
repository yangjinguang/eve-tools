var qs = require("querystring");
var bodyParser = require('body-parser');
var eveDB = require('../eveDB');
var httpRes = require('../services/httpRes.service');

var industryCtrl = {};

industryCtrl.plan = {
    list: function (req, res) {
        eveDB.industryPlans.get(null, function (errData, resData) {
            if (errData) {
                httpRes.error(res, errData);
            } else {
                httpRes.success(res, resData)
            }
        })
    },
    get: function (req, res) {
        var planId = req.params.id;
        eveDB.industryPlans.get(planId, function (errData, resData) {
            if (errData) {
                httpRes.error(res, errData);
            } else {
                if (resData.length > 0) {
                    var planData = resData[0];
                    eveDB.industryPlanItems.get(planId, function (errData, resData) {
                        if (errData) {
                            httpRes.error(res, errData)
                        } else {
                            planData.materials = resData;
                            httpRes.success(res, planData);
                        }
                    })
                }
            }
        })
    },
    create: function (req, res) {
        var planData = req.body;
        eveDB.industryPlans.create(planData, function (errData, resData) {
            if (errData) {
                httpRes.error(res, errData);
            } else {
                planData.id = resData.id;
                eveDB.industryPlanItems.create(planData.id, planData.materials, function (errData, resData) {
                    if (errData) {
                        httpRes.error(res, errData);
                    } else {
                        httpRes.success(res, planData);
                    }
                });
            }
        })
    },
    update: function (req, res) {
        var planData = req.body;
        eveDB.industryPlans.update(planData, function (errData, resData) {
            if (errData) {
                httpRes.error(res, errData);
            } else {
                planData.id = resData.id;
                eveDB.industryPlanItems.create(planData.id, planData.materials, function (errData, resData) {
                    if (errData) {
                        httpRes.error(res, errData);
                    } else {
                        httpRes.success(res, planData);
                    }
                });
            }
        })
    },
    delete: function (req, res) {
        var planId = req.params.id;
        eveDB.industryPlans.delete(planId, function (errData, resData) {
            if (errData) {
                httpRes.error(res, errData);
            } else {
                httpRes.success(res, planData);
            }
        })
    }
};

module.exports = industryCtrl;
