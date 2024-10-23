"use strict";

var Router = require('express');
var router = new Router();
var path = require('path');
var admin_router = require(path.join(__dirname, 'routes', 'admin_router'));
router.use('/admin', admin_router);
module.exports = router;