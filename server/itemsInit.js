var eveDB = require('./eveDB');

function pathInit() {
    eveDB.items.getSrc(null, function (errData, resData) {
        // console.log(resData)
        var markets = [];
        resData.forEach(function (item) {
            markets = [item['m-6'], item['m-5'], item['m-4'], item['m-3'], item['m-2'], item['m-1']];
            item.path = markets.join('/').replace(/\/\/+/, '/').replace(/^\//, '');
            console.log(item.path);
        });
        eveDB.items.updatePath(resData, function (errData, resData) {
            // console.log(item.id+' ok')
        })

    });
}
function typesInit() {

    eveDB.items.getPaths(null, function (errData, resData) {
        var types_o = [];

        function isInTypes(types, name, _path) {
            var res = -1;
            types.forEach(function (i, index) {
                if (i.name == name && i.path == _path) {
                    res = index
                }
            });
            return res;
        }

        resData.forEach(function (item) {
            if (item.path == '') {
                return;
            }
            item.path = item.path.split('/');
            for (var i = 0; i < 6; i++) {
                var _path = i == 0 ? 'root' : item.path.slice(0, i).join('/');
                if (item.path[i] && isInTypes(types_o, item.path[i], _path) < 0) {
                    types_o.push({name: item.path[i], path: _path});
                }
            }
        });
        console.log(types_o);
        eveDB.itemTypes.createBatch(types_o, function (errData, resData) {
            console.log('success')
        });
    })
}

typesInit();

