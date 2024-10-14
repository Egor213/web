let database_users = require('../../database/database_users_controller');
class LoginController {
    login(req, res) {
        if (database_users.checkName(req.body.username)) {
            if (database_users.getPassword(req.body.username) != req.body.password) {
                res.render('index.pug', { errorMessage: "Вы ввели неверный пароль!" });
                return; 
            }
            res.render('main_page.pug', { login: req.body.username });
        } else {
            database_users.addUser(req.body.username, req.body.password);    
            res.render('main_page.pug', { login: req.body.username });
        }
    }
}

module.exports = new LoginController();
