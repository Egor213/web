const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');
const db_news = require(path.join(__dirname, 'database_news_controller'))
class DatabaseUsersController {
    constructor(path_database) {
        this.path = path_database;
    }

    getArrData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data['users'];
        } catch(e) {
            console.error("Ошибка при открытий JSON файла");
            return false;
        }
    }

    getAllUsers() {
        return this.getArrData();
    }

    getUserById(id) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].id == id) 
                return data[index];
        }
        return false;
    }

    getIdFriendsUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.friends;
        return false;
    }

    getNameUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.name;
        return false;
    }

    getJSONFriendsUser(id) {
        const data = this.getArrData();
        const id_friends = this.getIdFriendsUser(id);
        if (!id_friends)
            return false;
        const dest_json = [];
        for (let index in data) {
            if (id_friends.includes(data[index].id)) {
                dest_json.push(data[index])
            }
        }
        return dest_json;
    }

    getNewsFriends(id) {
        const friends = this.getIdFriendsUser(id);
        const temp_json = [];
        for (let index in friends) {
            const data = db_news.getNewsById(friends[index]);
            if (data) {
                data.name = this.getNameUser(friends[index]);
                temp_json.push(data); 
            }
        }
        return temp_json;
    }
}
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));