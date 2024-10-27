const path = require('path');
const db_users = require(path.join(__dirname, '..','..', '..', 'database', 'database_controllers', 'database_users_controller'));
class AdminController {
    renderMainPage(req, res) {
        const data = db_users.getAllUsers();
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Пользователи не найдены"});
    }
}

module.exports = new AdminController();
