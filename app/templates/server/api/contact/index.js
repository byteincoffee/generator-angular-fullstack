'use strict';

var express = require('express');
var controller = require('./feature.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.contact);

module.exports = router;
