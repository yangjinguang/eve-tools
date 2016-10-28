var config = {};

config.eveMarketApi = 'http://www.ceve-market.org/api';
config.eveJitaMarketApi = config.eveMarketApi + '/market/region/10000002/system/30000142/type';

config.mysql = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456'
};

module.exports = config;