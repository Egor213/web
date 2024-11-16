"use strict";

var Router = require('express');
var router = new Router();
var path = require('path');
var admin_controller = require(path.join(__dirname, '..', 'controllers', 'admin_controller'));
router.get('/', admin_controller.renderMainPage);
module.exports = router;