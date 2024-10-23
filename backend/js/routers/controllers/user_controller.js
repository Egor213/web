const path = require('path');
const db_news = require(path.join(__dirname, '..', '..','database_controllers', 'database_news_controller'));
const db_users = require(path.join(__dirname, '..', '..','database_controllers', 'database_users_controller'));
class UserController {
    renderUserNews(req, res) {
        const user_id = req.params.id;
        const friends = db_users.getIdFriendsUser(user_id);
        const temp_json = [];

        for (let index in friends) {
            const data = db_news.getNewsById(friends[index]);
            if (data) {
                temp_json.push(data); 
            }
        }
        
        if (temp_json.length > 0) { 
            res.status(200).json(temp_json);
        } else {
            res.status(404).json({ error: "Новости пользователя не найдены" });
        }
    }

    renderUserFriends(req, res) {

    }
}

module.exports = new UserController();
