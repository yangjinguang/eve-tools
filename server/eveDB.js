var mysql = require('mysql');
var config = require('./config');
var mysqlConf = config.mysql;
var pool = mysql.createPool({
    host: mysqlConf.host,
    user: mysqlConf.user,
    password: mysqlConf.password,
    database: 'eve',
    port: mysqlConf.port
});
function _query(sql, cb) {
    // console.log(sql)
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            cb({status: '500', msg: err})
        }
        conn.query(sql, function (err, resData) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                cb({status: '500', msg: err})
            }
            cb(null, resData);
            conn.release();
        });
    });
}

var eveDB = {};
eveDB.items = {
    getMinerals: function (next) {
        var sql = 'select * from items where first_market = "矿物"';
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    }
};
eveDB.industryPlans = {
    get: function (planId, next) {
        var sql;
        if (!planId) {
            sql = 'select * from industry_plans';
            _query(sql, function (errData, resData) {
                next(errData, resData)
            })
        } else {
            sql = 'select * from industry_plans where id = ' + planId;
            _query(sql, function (errData, resData) {
                next(errData, resData)
            })
        }
    },
    create: function (planData, next) {
        var sql = 'select * from industry_plans where name = "' + planData.name + '"';
        _query(sql, function (errData, resData) {
            if (resData.length > 0) {
                next({status: '400', msg: '名称重复'});
            } else {
                sql = 'insert into industry_plans (name) values ("' + planData.name + '")';
                _query(sql, function (errData, resData) {
                    planData.id = resData.insertId;
                    next(errData, planData)
                })
            }
        })

    },
    update: function (planData, next) {
        var sql = 'select * from industry_plans where id != ' + planData.id + ' and name = "' + planData.name + '"';
        _query(sql, function (errData, resData) {
            if (resData.length > 0) {
                next({status: '400', msg: '名称重复'});
            } else {
                sql = 'replace into industry_plans (id,name) values ("' + planData.id + '","' + planData.name + '")';
                _query(sql, function (errData, resData) {
                    planData.id = resData.insertId;
                    next(errData, planData)
                })
            }
        });
    },
    delete: function (planId, next) {
        var sql = 'delete from industry_plans where id = ' + planId;
        _query(sql, function (errData, resData) {
            next(errData, 'success')
        })
    }
};
eveDB.industryPlanItems = {
    get: function (planId, next) {
        var sql = 'select a.plan_id as plan_id,a.type_id as type_id,b.name as item_name,a.number as number from industry_plan_items as a,items as b where a.plan_id = 3 and a.type_id = b.type_id;'
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    },
    create: function (planId, items, next) {
        _query('delete from industry_plan_items where plan_id = ' + planId, function (errData, resData) {
            if (errData) {
                next(errData, resData)
            } else {
                var values = [];
                items.forEach(function (i) {
                    var _values = [planId, i.typeId, i.number];
                    values.push('("' + _values.join('","') + '")')
                });
                var sql = 'insert into industry_plan_items (plan_id,type_id,number) values ' + values.join(',');
                _query(sql, function (errData, resData) {
                    next(errData, resData)
                });
            }

        });

    }
};


module.exports = eveDB;