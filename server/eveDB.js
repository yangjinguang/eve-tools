var mysql = require('mysql');
var config = require('./config');
var async = require('async');

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
    getPaths: function (typeId, next) {
        var sql = 'select path from items where path != "" group by path';
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    },
    getSrc: function (typeId, next) {
        var sql;
        if (!typeId) {
            sql = 'select * from items_src'
        } else {
            sql = 'select * from items_src where type_id = ' + typeId;
        }
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    },
    getByPath: function (path, next) {
        var sql = 'select `id`,`type_id` as `typeId`,`name` as itemName,`describe`,`path` from items where `path` = "' + path + '"';
        console.log(sql)
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    },
    updatePath: function (items, next) {
        var sqls = [];
        items.forEach(function (i) {
            sqls.push('update items set path = "' + i.path + '" where id = ' + i.id);
        });
        async.each(sqls, function (sql, callback) {
            _query(sql, function (errData, resData) {
                console.log(sql);
                callback(errData, resData)
            })
        }, function (err) {
            // 所有SQL执行完成后回调
            if (err) {
                console.log(err);
                next(err)
            } else {
                console.log("SQL全部执行成功");
                next(err, 'success')
            }
        });

    },
    getMinerals: function (next) {
        var sql = 'select * from items_src where m-1 = "矿物"';
        _query(sql, function (errData, resData) {
            next(errData, resData)
        })
    }
};
eveDB.itemTypes = {
    create: function (item, next) {

    },
    createBatch: function (items, next) {
        var values = [];
        items.forEach(function (i) {
            var _values = [i.name, i.path];
            values.push('("' + _values.join('","') + '")')
        });
        var sql = 'insert into item_types (name,path) values ' + values.join(',');
        _query(sql, function (errData, resData) {
            next(errData, resData)
        });
    },
    getByPath: function (path, next) {
        // var sql = 'select id,name,path from item_types where path = "' + path + '"';
        var sql;
        if (path == 'root') {
            sql = 'select a.id,a.name,a.path,(select count(0) from item_types as b where b.path = a.name) as childrenCount from item_types as a where a.path = "' + path + '";'
        } else {
            sql = 'select a.id,a.name,a.path,(select count(0) from item_types as b where b.path = concat(a.path,"/",a.name)) as childrenCount from item_types as a where a.path = "' + path + '";'

        }
        _query(sql, function (errData, resData) {
            next(errData, resData)
        });
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
        var sql = 'select a.plan_id as planId,a.type_id as typeId,b.name as itemName,a.number as number from industry_plan_items as a,items as b where a.plan_id = 3 and a.type_id = b.type_id;'
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