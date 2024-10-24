"use strict";

var Router = require('express');
var router = new Router();
var path = require('path');
var user_controller = require(path.join(__dirname, '..', 'controllers', 'user_controller'));
router.get('/news/:id', user_controller.renderUserNews);
router.get('/friends/:id', user_controller.renderUserFriends);
router.get('/get_name/:id', user_controller.renderUserName);
module.exports = router;