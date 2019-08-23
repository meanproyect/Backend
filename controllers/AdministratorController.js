'use strict'

var User = require('../models/UserModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function saveuser(req, res){
    var user = new User();
    var params = req.body;

    if(params.password && params.name && params.surname && params.user && params.role){
        user.name = params.name;
        user.surname = params.surname;
        
    }else{
        res.status(500).send({message: 'Introduce bien los datos'});
    }
}

module.exports = {
    saveuser
}