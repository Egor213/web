const path = require("path");
const db_users = require(path.join(__dirname, '..', 'database_controllers', 'database_users_controller.js'))


function check_id_user(req, res, next) {
    const user_id = req.params.id;
    const user = db_users.getUserById(user_id);
    if (user)
        next(); 
    else 
        res.status(404).send('<h1>User not found!</h1>');
}


module.exports = check_id_user;