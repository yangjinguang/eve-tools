var qs = require("querystring");
var bodyParser = require('body-parser');
var eveMarket = require('../services/eveMarket.service');
var eveDB = require('../eveDB');


var itemsCtrl = {
    getMinerals: function (req, res) {
        eveDB.items.getMinerals(function (errData, resData) {
            if (errData) {
                res.status(errData.status);
                res.send({data: errData.msg})
            } else {
                res.send({data: resData})
            }
        })
    },
    price: function (req, res) {
        eveMarket.getItemPirce(req.params.typeId, function (errData, resData) {
            if (errData) {
                res.status(errData.status);
                res.send({data: errData.msg})
            } else {
                res.send({data: resData})
            }
        })
    },
    getByPath: function (req, res) {
        console.log(req.query);
        eveDB.items.getByPath(req.query.path, function (errData, resData) {
            if (errData) {
                res.status(errData.status);
                res.send({data: errData.msg})
            } else {
                res.send({data: resData})
            }
        })
    },
    getTypes: function (req, res) {
        var path = req.query.path || 'root';
        eveDB.itemTypes.getByPath(path, function (errData, resData) {
            if (errData) {
                res.status(errData.status);
                res.send({data: errData.msg})
            } else {
                res.send({data: resData})
            }
        })
    }
};

module.exports = itemsCtrl;