var qs = require("querystring");
var config = require('../config');
var request = require("request");
var eveJitaMarketApi = config.eveJitaMarketApi;

var eveMarket = {
    getItemPirce: function (typeId, next) {
        var url = eveJitaMarketApi + '/' + typeId + '.json';
        var options = {
            method: 'GET',
            url: url,
            json: true,
            headers: {
                "content-type": "application/json",
            }

        };
        // console.log('GET ' + url);
        request(options, function (err, resData, body) {
            if (err) {
                next(null, 'Null')
            } else {
                next(null, body)
            }
        });
    }
};
module.exports = eveMarket;