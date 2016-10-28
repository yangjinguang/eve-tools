var httpRes = {};
httpRes.success = function (res, data) {
    res.send({data: data})
};
httpRes.error = function (res, errData) {
    res.status = errData.status;
    res.send({data: errData.msg})
};

module.exports = httpRes;