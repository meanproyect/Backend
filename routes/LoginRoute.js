'use strict';

var express = require('express');
var loignController = require('../controllers/LoginController');
var api = express.Router();

api.post('/Login', loignController.login);

module.exports = api