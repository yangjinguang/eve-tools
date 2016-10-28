var express = require('express');
var bodyParser = require('body-parser');
// var Ctrl = require('./controllers');
var industryCtrl = require('./controllers/industry.controller');
var itemsCtrl = require('./controllers/items.controller');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/price/:typeId', itemsCtrl.price);
app.get('/items/minerals', itemsCtrl.getMinerals);

app.get('/industry/plan', industryCtrl.plan.list);
app.get('/industry/plan/:id', industryCtrl.plan.get);
app.post('/industry/plan', industryCtrl.plan.create);
app.put('/industry/plan', industryCtrl.plan.update);
app.delete('/industry/plan/:id', industryCtrl.plan.delete);


app.listen(6543, function () {
    console.log('Example app listening on port 6543!');
});