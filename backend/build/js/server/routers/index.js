"use strict";

var Router = require('express');
var router = new Router();
var path = require('path');
var admin_router = require(path.join(__dirname, 'routes', 'admin_router'));
var user_router = require(path.join(__dirname, 'routes', 'user_router'));
router.use('/admin', admin_router);
router.use('/user', user_router);
module.exports = router;