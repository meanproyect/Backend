'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_super_secreta_del_proyecto';

exports.createToken = function (user) {
    var playload = {
        sub: user._id,
        name: user.name,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix
    };
    return jwt.encode(playload, secret);
}
exports.createTokenClient = function (user) {
    var playload = {
        sub: user._id,
        nameClient: user.nameClient,
        country: user.country,
        clientCode: user.clientCode,
        role: user.role,
    };
    return jwt.encode(playload,secret);
}