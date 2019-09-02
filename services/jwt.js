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
        code: user.clientCode,
        role: user.role,
    };
    return jwt.encode(playload, secret);
}

exports.createTokenSupport = function (user) {
    var playload = {
        sub: user._id,
        nameClient: user.nameClient,
        country: user.country,
        code: user.clientCode,
        role: user.role,
        client: user.client
    };
    return jwt.encode(playload, secret);
}
exports.createTokenTicket = function (ticket) {
    var playload = {
        title: ticket.title,
        decription: ticket.decription,
        status: ticket.status,
        startDate: ticket.startDate,
        client: ticket.client
    }
    return jwt.encode(playload,secret);
}