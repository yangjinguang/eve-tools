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
    }
};

module.exports = itemsCtrl;