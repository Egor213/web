"use strict";

var path = require("path");
var db_users = require(path.join(__dirname, '..', 'database_controllers', 'database_users_controller.js'));
function check_id_user(req, res, next) {
  var user_id = req.params.id;
  var user = db_users.getUserById(user_id);
  if (user) next();else res.status(404).send('<h1>User not found!</h1>');
}
module.exports = check_id_user;