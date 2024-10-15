let database_users = require('../../database/database_users_controller');
class LoginController {
    login(req, res) {
        if (database_users.checkName(req.body.username)) {
            if (database_users.getPassword(req.body.username) != req.body.password) {
                res.render('index.pug', { errorMessage: "Вы ввели неверный пароль!" });
                return; 
            }
            save_login_to_json(req.body.username)
            res.render('main_page.pug', { login: req.body.username });
        } else {
            save_login_to_json(req.body.username)
            database_users.addUser(req.body.username, req.body.password);    
            res.render('main_page.pug', { login: req.body.username });
        }
    }
}

const fs = require('fs');
const path = require('path');

function save_login_to_json(login) {
    const filePath = path.join(__dirname, 'cur_session.json');
    const data = {
        login: login
    };
    fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return;
        }
    });
}

module.exports = new LoginController();
